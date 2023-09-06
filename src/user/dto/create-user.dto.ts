import { IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    @IsNotEmpty()
    username:string
    @IsString()
    password:string
    @IsString()
    @IsNotEmpty()
    address:string
    @IsString()
    image:string
    @IsString()
    refreshtoken:string

}
