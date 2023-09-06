import { Injectable } from '@nestjs/common';
import { CreateProjetDto } from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto';
import { IProjet } from './Interface/projet.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProprietaire } from 'src/proprietaire/Interface/proprietaire.interface';
import { ProprietaireModule } from 'src/proprietaire/proprietaire.module';
import { IUser } from 'src/user/Interface/user.interface';

@Injectable()
export class ProjetService {
  constructor(@InjectModel("projets") private projetModel: Model<IProjet>,@InjectModel("users") private proprietaireModel: Model<IProprietaire>) {}
  async create(createProjetDto: CreateProjetDto): Promise<IProjet> {
    const createdProjet = await new this.projetModel(createProjetDto);
    const projetid= createdProjet._id
    await  this.proprietaireModel.findByIdAndUpdate(createProjetDto.proprietaire,{$push:{projets:projetid}},{new:true})
    const proprietaire= await this.proprietaireModel.findById(createProjetDto.proprietaire)
    console.log(proprietaire)
    console.log(createdProjet)
    return createdProjet.save();
  }
  async findAll(): Promise<IProjet[]> {
    return this.projetModel.find().populate("proprietaire").exec();
  }
  async findProjetById(id: string): Promise<IProjet> {
    return  this.projetModel.findById(id).populate("proprietaire");
  }
  async findByname(name: string): Promise<IProjet> {
    return this.projetModel.findOne({ name }).exec();
  }
  async update(id: string, updateUserDto: UpdateProjetDto): Promise<IProjet> {
    return this.projetModel.findByIdAndUpdate(id,updateUserDto, { new: true }).exec();
    
  }
  async remove(id: string): Promise<IProjet> {
    return this.projetModel.findByIdAndDelete(id).exec();
  
  }
  async getProjetByProprietaire(proprietaireid:string): Promise<IProjet[]> {
    return this.projetModel.find({proprietaire:proprietaireid}).populate("proprietaire");
  }
}
