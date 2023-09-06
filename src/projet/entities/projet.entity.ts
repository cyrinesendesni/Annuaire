import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes, Types } from "mongoose";
import * as argon2 from "argon2";
@Schema({ timestamps: true })
export class ProjectEntity extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    description: string;
    
    @Prop({ required: true })
    contenu: string;
    @Prop({type: SchemaTypes.ObjectId, ref:"users"})
    proprietaire: Types.ObjectId;
    
}
export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity)
  
