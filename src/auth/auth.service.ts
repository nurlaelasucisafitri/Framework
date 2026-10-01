import { Injectable } from '@nestjs/common';
import { User } from './entities/users-entity.js';
import { RegisterDto } from './dto/register-dto.js';

@Injectable()
export class AuthService {
    // register
    register(registerDto: RegisterDto) : User {
        const newUser: User = {
            id: 1,
            username: registerDto.username,
            email: registerDto.email,
            password: registerDto.password,
        };
        return newUser;
    }

    //Login
    login(): string {
        return "Login berhasil";
    }

    // Forgot Password

    //Password Recovery
}
