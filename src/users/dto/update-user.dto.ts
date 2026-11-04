import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: "Nama harus berupa teks" })
    readonly nama?: string;

    @IsOptional()
    @IsEmail({}, { message: "Format Email tidak valid" })
    readonly email?: string;

    @IsOptional()
    @MinLength(8, { message: "Password minimal 8 karakter" })
    @MaxLength(12, { message: "Password maksimal 12 karakter" })
    readonly password?: string;

    @IsOptional()
    @IsNumber({}, { message: "Phone harus berupa angka" })
    readonly phone?: number;

    @IsOptional()
    @IsString({ message: "Alamat harus berupa teks" })
    readonly alamat?: string;
}