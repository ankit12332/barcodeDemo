/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(email:string, password:string){
        //see if email is already in use
        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('Email already in use')
        }
        //Hash the users password
        //Generate salt
        const salt = randomBytes(8).toString('hex');

        //Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        //Create a new user and save it
        const user = await this.usersService.create(email, result);

        //Return the user
        return user;
    }

    async signin(email:string, password:string){
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new NotFoundException('User not found')
        }

        //Destructuring
        const [salt, storedHash] = user.password.split('.');
        //console.log('salt is ' + salt);
        //console.log('storedHash is ' + storedHash);

        const hash = (await scrypt(password, salt, 32)) as Buffer;
         if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('Password not matched')
         }
         //console.log('hash is '+ hash.toString('hex') )
        return user;
    }
}
