import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpadateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
//@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body); //For testing whether the create req is working on not in console
        //this.usersService.create(body.email, body.password);
        return this.authService.signup(body.email, body.password);
    }

    @Post('/signin')
    signin(@Body() body: CreateUserDto){
        return this.authService.signin(body.email, body.password);
    }

    //@UseInterceptors(new SerializeInterceptor(UserDto)) //It's used to hide the password which we defined in user.entity.ts
    @Serialize(UserDto) //It's also used to hide the password which we defined in user.entity.ts.  If you want to use this role for every req then you have to configure it below controller. see the commented code above
    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.usersService.findOne(parseInt(id));
    }

    
    @Get()
    findUsers(@Query('email') email:string){
        return this.usersService.find(email);
        
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpadateUserDto){
        return this.usersService.update(parseInt(id), body)
    }
}
