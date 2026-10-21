import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
    @IsNotEmpty ({message:"Username Harus Diisi"})
    readonly username: string;

    @IsNotEmpty ({message:"Email Harus Diisi"})
    @IsEmail ({}, {message:"Format Email tidak valid"})
    readonly email: string;

    @IsNotEmpty ({message:"Password Harus Diisi"})
    @MinLength (8, {message:"Password minimal 8 karakter"})
    @MaxLength (12, {message:"Password maksimal 12 karakter"})
    readonly password: string;

    @IsNotEmpty ({message:"Konfirmasi Password Harus Diisi"})
    @MinLength (8, {message:"Konfirmasi Password minimal 8 karakter"})
    @MaxLength (12, {message:"Konfirmasi Password maksimal 12 karakter"})
    readonly passwordConfirm: string;
}