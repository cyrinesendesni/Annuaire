import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProjetModule } from './projet/projet.module';
import { AdminModule } from './admin/admin.module';
import { ProprietaireModule } from './proprietaire/proprietaire.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cyrinesendesni:TxL3bqP1xorDPtr6@cluster0.9yf9fhy.mongodb.net/?retryWrites=true&w=majority',{dbName:'projects'}),UserModule, ProjetModule, AdminModule, ProprietaireModule, AuthModule,ConfigModule.forRoot({ isGlobal: true }),

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
