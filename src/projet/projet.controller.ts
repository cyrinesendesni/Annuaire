import { Controller,Get,Post,Body, Patch, Param, Delete, UseGuards,Put, Res, HttpStatus, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { CreateProjetDto } from './dto/create-projet.dto';
import { UpdateProjetDto } from './dto/update-projet.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projet')
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/projet",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async create(@Body() createProjetDto: CreateProjetDto , @Res() response, @UploadedFile() file: Express.Multer.File) {
    try {
      createProjetDto.contenu= file.filename
      const user= await this.projetService.create(createProjetDto);
  
  return response.status(HttpStatus.CREATED).json({
    data: user,
    message:"Project created successfully",
    status:HttpStatus.CREATED,
  })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        message:"Project was not created" + error.message,
        status:HttpStatus.BAD_REQUEST,
      })
          
      
    }
     
}
@Get('byname')
async findByprojectname(@Query('name') name: string, @Res() response) {
  try {
    const user= await this.projetService.findByname(name);
return response.status(HttpStatus.OK).json({
  data: user,
  message:"Project found successfully",
  status:HttpStatus.OK,
})
    
  } catch (error) {
  
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: null,
      message:"user not found"+ error.message,
      status:HttpStatus.BAD_REQUEST,
  })
  
  
}
}
@Get('liste/:id')
  async findProjet(@Param('id') id: string, @Res() response) {
    try {
      const liste= await this.projetService.getProjetByProprietaire(id);
  return response.status(HttpStatus.OK).json({
    data: liste,
    message:"project found successfully",
    status:HttpStatus.OK,
  })
      
    } catch (error) {
    
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        message:"project not found"+ error.message,
        status:HttpStatus.BAD_REQUEST,
    })
    
    
  }
}
  @Get()
  async findAll(@Res() response) {
    try {
      const projetlist= await this.projetService.findAll();
  return response.status(HttpStatus.OK).json({
    data: projetlist,
    message:"project present successfully",
    status:HttpStatus.OK,
  })
      
    } catch (error) {

  return response.status(HttpStatus.BAD_REQUEST).json({
    data: null,
    message:"project not found"+ error.message,
    status:HttpStatus.BAD_REQUEST,
  })
    }
     
}
  @Get(':id')
  async findById(@Param('id') id: string, @Res() response) {
    try {
      const userid= await this.projetService.findProjetById(id);
  return response.status(HttpStatus.OK).json({
    data: userid,
    message:"project found successfully",
    status:HttpStatus.OK,
  })
      
    } catch (error) {
    
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        message:"project not found"+ error.message,
        status:HttpStatus.BAD_REQUEST,
    })
    
    
  }
}
  @Put(':id')
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/projet",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async update(@Param('id') id: string, @Body() updateProjetDto: UpdateProjetDto, @Res() response,@UploadedFile() file: Express.Multer.File) {
    try {
      if(file===undefined || file===null){
        updateProjetDto.contenu=(await this.projetService.findProjetById(id)).contenu
      const userupdate= await  this.projetService.update(id, updateProjetDto);
      console.log("affichage")
  return response.status(HttpStatus.OK).json({
    data: userupdate,
    message:"Project updated successfully",
    status:HttpStatus.OK,
     })
      }
      else{
        updateProjetDto.contenu=file.filename
        const userupdate= await  this.projetService.update(id, updateProjetDto);
        console.log("affichage")
    return response.status(HttpStatus.OK).json({
      data: userupdate,
      message:"Project updated successfully",
      status:HttpStatus.OK,
       })
        
      }

    } catch (error) {

      return response.status(HttpStatus.BAD_REQUEST).json({
    data: null,
    message:"Project not updated"+ error,
    status:HttpStatus.BAD_REQUEST,
    })

    
}}
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const userdel= await this.projetService.remove(id);
  return response.status(HttpStatus.OK).json({
    data: userdel,
    message:"Project deleted successfully",
    status:HttpStatus.OK,
  })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        message:"could not delete Project",
        status:HttpStatus.BAD_REQUEST,
      })
      
    }
     
}

}
