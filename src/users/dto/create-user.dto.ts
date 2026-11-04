import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Nama harus berupa teks" })
    @IsNotEmpty({ message: "Nama Harus Diisi" })
    readonly nama: string;

    @IsNotEmpty({ message: "Email Harus Diisi" })
    @IsEmail({}, { message: "Format Email tidak valid" })
    readonly email: string;

    @IsNotEmpty({ message: "Password Harus Diisi" })
    @MinLength(8, { message: "Password minimal 8 karakter" })
    @MaxLength(12, { message: "Password maksimal 12 karakter" })
    readonly password: string;

    @IsNumber({}, { message: "Phone harus berupa angka" })
    readonly phone: number;

    @IsString({ message: "Alamat harus berupa teks" })
    @IsNotEmpty({ message: "Alamat Harus Diisi" })
    readonly alamat: string;
}