import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCustomerAddressDto {
    @IsOptional()
    @IsString({ message: "Recipient name harus berupa teks" })
    @MaxLength(150, { message: "Recipient name maksimal 150 karakter" })
    readonly recipient_name?: string;

    @IsOptional()
    @IsString({ message: "Phone harus berupa teks" })
    @MaxLength(20, { message: "Phone maksimal 20 karakter" })
    readonly phone?: string;

    @IsOptional()
    @IsString({ message: "Address harus berupa teks" })
    readonly address?: string;

    @IsOptional()
    @IsString({ message: "City harus berupa teks" })
    @MaxLength(100, { message: "City maksimal 100 karakter" })
    readonly city?: string;

    @IsOptional()
    @IsString({ message: "Postal code harus berupa teks" })
    @MaxLength(10, { message: "Postal code maksimal 10 karakter" })
    readonly postal_code?: string;
}