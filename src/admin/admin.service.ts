import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAdmin } from './Interface/admin.interface';
import { AdminModule } from './admin.module';
@Injectable()
export class AdminService {
  constructor(@InjectModel("users") private userModel: Model<IAdmin>) {}
  async create(createAdminDto: CreateAdminDto): Promise <IAdmin> {
    const createdAdmin = new this.userModel(createAdminDto);
    return createdAdmin.save();
    
  }

  async findAll(): Promise<IAdmin[]> {
    return this.userModel.find({role: "admin"}).exec();
  }
  async findUserById(id: string): Promise<IAdmin> {
    return this.userModel.findById(id);
  }
  async findByUsername(username: string): Promise<IAdmin> {
    return this.userModel.findOne({ username }).exec();
  }
  async update(id: string, updateUserDto: UpdateAdminDto): Promise<IAdmin> {
    return this.userModel.findByIdAndUpdate(id,updateUserDto, { new: true }).exec();
    
  }
  async remove(id: string): Promise<IAdmin> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
