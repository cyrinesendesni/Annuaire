import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { Proprietaire } from 'src/proprietaire/entities/proprietaire.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminSchema } from 'src/admin/entities/admin.entity';
import { ProprietaireSchema } from 'src/proprietaire/entities/proprietaire.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"users",schema:UserSchema, discriminators: [

    { name: "admin", schema: AdminSchema},
    {name: "proprietaire", schema: ProprietaireSchema}
  ], 
}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
  
})
export class UserModule {}
