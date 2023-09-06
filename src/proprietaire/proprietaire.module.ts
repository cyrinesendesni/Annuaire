import { Module } from '@nestjs/common';
import { ProprietaireService } from './proprietaire.service';
import { ProprietaireController } from './proprietaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProprietaireSchema } from './entities/proprietaire.entity';
import { UserSchema } from 'src/user/entities/user.entity';


@Module({
  imports: [MongooseModule.forFeature([{name:"users", schema:UserSchema}])],
  controllers: [ProprietaireController],
  providers: [ProprietaireService]
})
export class ProprietaireModule {}
