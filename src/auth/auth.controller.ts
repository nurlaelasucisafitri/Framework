import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register-dto.js';
import { LoginDto } from './dto/login-dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login();
    }

    @Post('forgot-password')
    forgotPassword(){
        return"Link reset password berhasil dikirim ke email";
    }

    @Post('password-recovery')
    passwordRecovery(){
        return"Password berhasil diubah";
    }
}