import { IsNotEmpty,IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export class CreateAdminDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email:string
    role: string
}
