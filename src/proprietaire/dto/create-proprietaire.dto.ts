import { CreateUserDto } from "src/user/dto/create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProprietaireDto extends CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    role:string
}
