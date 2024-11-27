import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                @InjectRepository(User) private userRepository: Repository<User>){}

    async funRegister(objeUser: RegisterAuthDto){
        const {password}=objeUser //capturamos solo password de todo el objeto
       // console.log("Antes:", objeUser)
        const plainToHash=await hash(password, 12) //para encriptar la contraseña
        //console.log(plainToHash)

        objeUser={...objeUser,password:plainToHash}
        //almacena todos los datos exepto el password que fue sacado y guarda un nuevo password
        //console.log("Despues:",objeUser)

        return this.userRepository.save(objeUser) // para guardar en la BDD
    }
    async login(credenciales: LoginAuthDto){
        const {email,password}=credenciales
        const user=await this.userRepository.findOne({
            where:{
                mail: email
            }
        })
        //si no existe el usuario lanzamos una exepcion
        if(!user) return new HttpException('Usuario no encontrado',404);

        const verificarPass = await compare(password, user.password)

        if(!verificarPass) throw new HttpException('Password Invalido',401)


        let payload={email:"admin@gmail.com",id:1}
        const token= this.jwtService.sign(payload)
        return {token:token};

    }
}
