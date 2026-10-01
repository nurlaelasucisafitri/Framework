import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('register')
    register(){
        return"user berhasil didaftarkan";
    }

    @Post('login')
    login(){
        return"user berhasil login";
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
