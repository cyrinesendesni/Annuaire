
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes, Types } from "mongoose";
import * as argon2 from "argon2";
@Schema({ })
export class Proprietaire extends Document {
    role: string
    @Prop([{ type: SchemaTypes.ObjectId, ref:"projets"}])
    projets: Types.ObjectId[];
   


    
    
    
}
export const ProprietaireSchema = SchemaFactory.createForClass(Proprietaire)
