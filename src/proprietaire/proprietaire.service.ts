import { Injectable } from '@nestjs/common';
import { CreateProprietaireDto } from './dto/create-proprietaire.dto';
import { UpdateProprietaireDto } from './dto/update-proprietaire.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProprietaire } from './Interface/proprietaire.interface';

@Injectable()
export class ProprietaireService {
  constructor(@InjectModel("users") private userModel: Model<IProprietaire>) {}

  async create(createProprietaireDto: CreateProprietaireDto): Promise <IProprietaire> {
    const createdProprietaire = new this.userModel(createProprietaireDto);

    return createdProprietaire.save();
  }

  async findAll(): Promise<IProprietaire[]> {
    return this.userModel.find({role: "proprietaire"}).exec();
  }
  async findUserById(id: string): Promise<IProprietaire> {
    return this.userModel.findById(id);
  }
  async findByUsername(username: string): Promise<IProprietaire> {
    return this.userModel.findOne({ username }).exec();
  }
  async update(id: string, updateUserDto: UpdateProprietaireDto): Promise<IProprietaire> {
    return this.userModel.findByIdAndUpdate(id,updateUserDto, { new: true }).exec();
    
  }
  async remove(id: string): Promise<IProprietaire> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
