import { Document } from "mongoose";
export interface IUser extends Document{
    name:string
    username:string
    address:string
    password:string
    image:string
    refreshtoken:string
}