import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCustomerDto {
    @IsString({ message: "Name harus berupa teks" })
    @IsNotEmpty({ message: "Name Harus Diisi" })
    @MaxLength(150, { message: "Name maksimal 150 karakter" })
    readonly name: string;

    @IsNotEmpty({ message: "Email Harus Diisi" })
    @IsEmail({}, { message: "Format Email tidak valid" })
    @MaxLength(150, { message: "Email maksimal 150 karakter" })
    readonly email: string;

    @IsString({ message: "Phone harus berupa teks" })
    @IsNotEmpty({ message: "Phone Harus Diisi" })
    @MaxLength(20, { message: "Phone maksimal 20 karakter" })
    readonly phone: string;
}