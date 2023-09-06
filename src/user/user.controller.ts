import { Controller,Get,Post,Body, Patch, Param, Delete, UseGuards,Put, Res, HttpStatus, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/user",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async create(@Body() createUserDto: CreateUserDto , @Res() response, @UploadedFile() file: Express.Multer.File) {
    try {
      createUserDto.image= file.filename
      const user= await this.usersService.create(createUserDto);
  
  return response.status(HttpStatus.CREATED).json({
    data: user,
    message:"user created successfully",
    status:HttpStatus.CREATED,
  })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        message:"user was not created" + error.message,
        status:HttpStatus.BAD_REQUEST,
      })
          
      
    }
     
}
@Get('name')
async findByusername(@Query('username') username: string, @Res() response) {
  try {
    const user= await this.usersService.findByUsername(username);
return response.status(HttpStatus.OK).json({
  data: user,
  message:"user found successfully",
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
  @Get()
  async findAll(@Res() response) {
    try {
      const userlist= await this.usersService.findAll();
  return response.status(HttpStatus.OK).json({
    data: userlist,
    message:"user present successfully",
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
  @Get(':id')
  async findById(@Param('id') id: string, @Res() response) {
    try {
      const userid= await this.usersService.findUserById(id);
  return response.status(HttpStatus.OK).json({
    data: userid,
    message:"user found successfully",
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
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() response) {
    try {
      const userupdate= await  this.usersService.update(id, updateUserDto);
      console.log("affichage")
  return response.status(HttpStatus.OK).json({
    data: userupdate,
    message:"user updated successfully",
    status:HttpStatus.OK,
     })
    } catch (error) {

      return response.status(HttpStatus.BAD_REQUEST).json({
    data: null,
    message:"user not updated",
    status:HttpStatus.BAD_REQUEST,
    })
    
}}
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const userdel= await this.usersService.remove(id);
  return response.status(HttpStatus.OK).json({
    data: userdel,
    message:"user deleted successfully",
    status:HttpStatus.OK,
  })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        message:"could not delete user",
        status:HttpStatus.BAD_REQUEST,
      })
      
    }
     
}

}









