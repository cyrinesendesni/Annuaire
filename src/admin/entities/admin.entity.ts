import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes, Types } from "mongoose";
import * as argon2 from "argon2";
@Schema({ })
export class Admin extends Document {
    role: string
    @Prop({ required: true })
    email: string;

    
    
    
}
export const AdminSchema = SchemaFactory.createForClass(Admin)
