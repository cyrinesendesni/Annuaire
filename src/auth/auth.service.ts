import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateLoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  
  ) {} 
async signUp(createUserDto: CreateUserDto): Promise<any> { //register ,createuser
  // Check if user exists
  const userExists = await this.usersService.findByUsername(
    createUserDto.username,
  );
  if (userExists) {
    throw new BadRequestException('User already exists');
  }
  const newUser = await this.usersService.create(createUserDto);
  const tokens = await this.getTokens(newUser._id, newUser.username);
  await this.updateRefreshToken(newUser._id, tokens.refreshToken);
  return { tokens, newUser };
}
async signIn(data: CreateLoginDto) {   //login
  // Check if user exists
  const user = await this.usersService.findByUsername(data.username);
  if (!user) throw new BadRequestException('User does not exist');
  const passwordMatches = await argon2.verify(user.password, data.password);
  if (!passwordMatches)
    throw new BadRequestException('Password is incorrect');
  const tokens = await this.getTokens(user._id, user.username);
  await this.updateRefreshToken(user._id, tokens.refreshToken);
  return { tokens, user }
}
async getTokens(userId: string, username: string) {
  const [accessToken, refreshToken] = await Promise.all([
    this.jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '60m',
      },
    ),
    this.jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    ),
  ]);
  return {
    accessToken,
    refreshToken,
  };
}
hashData(data: string) {
  return argon2.hash(data);
}
async updateRefreshToken(userId: string, refreshToken: string) { // fonction pour hasher le refrechtoken
  const hashedRefreshToken = await this.hashData(refreshToken);
  await this.usersService.update(userId, {
    refreshtoken: hashedRefreshToken,
  });
}
async refreshTokens(userId: string, refreshToken: string) { // pour updater refrechtoken
  const user = await this.usersService.findUserById(userId);
  if (!user || !user.refreshtoken)
    throw new ForbiddenException('Access Denied');
  const refreshTokenMatches = await argon2.verify(
    user.refreshtoken,
    refreshToken,
  );
  if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
  const tokens = await this.getTokens(user.id, user.username);
  await this.updateRefreshToken(user.id, tokens.refreshToken);
  return tokens;
}
async logout(userId: string) {
  this.usersService.update(userId, { refreshtoken: null });
}
}











