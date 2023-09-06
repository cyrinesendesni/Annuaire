import { IsNotEmpty, IsString } from "class-validator";
export class CreateProjetDto {
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    @IsNotEmpty()
    description:string
    @IsString()
    @IsNotEmpty()
    proprietaire:string
    @IsString()
    @IsNotEmpty()
    contenu:string

}
