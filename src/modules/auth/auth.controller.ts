import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){
    }
    @Post('register')
    registerUser(@Body()userobj: RegisterAuthDto){
        console.log(userobj);
        return userobj;
    }
    @Post('login')
    login(@Body()credenciales:LoginAuthDto){
        this.authService.login(credenciales)
        return this.authService.login(credenciales)
    }
}
