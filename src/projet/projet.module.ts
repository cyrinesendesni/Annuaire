import { Module } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { ProjetController } from './projet.controller';
import { ProjectSchema } from './entities/projet.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"projets",schema:ProjectSchema},{name:"users" , schema:UserSchema}])],
  controllers: [ProjetController],
  providers: [ProjetService]
})
export class ProjetModule {}
