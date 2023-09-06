import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategie/accesstoken.strategy';
import { RefreshTokenStrategy } from './strategie/refreshtoken.strategy';

@Module({
  imports: [UserModule,JwtModule.register({

  })],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]

})
export class AuthModule {}
