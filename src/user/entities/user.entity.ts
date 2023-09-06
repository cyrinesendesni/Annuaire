import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes, Types } from "mongoose";
import * as argon2 from "argon2";
@Schema({ discriminatorKey: 'role'})
export class UserEntity extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    username: string;
    @Prop({ })
    password: string;
    @Prop({ required: true })
    address: string;
    @Prop()
    image: string;
    @Prop()
    refreshtoken: string;
    @Prop([{ type: SchemaTypes.ObjectId, ref:"projets"}])
    projets: Types.ObjectId[];
    
    
}
export const UserSchema = SchemaFactory.createForClass(UserEntity).pre("save", async function () {
    this.password = await argon2.hash(this.password);
  });
