import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCustomerDto {
    @IsOptional()
    @IsString({ message: "Name harus berupa teks" })
    @MaxLength(150, { message: "Name maksimal 150 karakter" })
    readonly name?: string;

    @IsOptional()
    @IsEmail({}, { message: "Format Email tidak valid" })
    @MaxLength(150, { message: "Email maksimal 150 karakter" })
    readonly email?: string;

    @IsOptional()
    @IsString({ message: "Phone harus berupa teks" })
    @MaxLength(20, { message: "Phone maksimal 20 karakter" })
    readonly phone?: string;
}