import { Document } from "mongoose";
export interface IProjet extends Document{
    name:string
    description:string
    proprietaire:string
    contenu:string

}