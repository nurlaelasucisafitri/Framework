import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateCustomerAddressDto {
    @IsUUID('all', { message: "customer_id harus berupa UUID yang valid" })
    @IsNotEmpty({ message: "customer_id Harus Diisi" })
    readonly customer_id: string;

    @IsString({ message: "Recipient name harus berupa teks" })
    @IsNotEmpty({ message: "Recipient name Harus Diisi" })
    @MaxLength(150, { message: "Recipient name maksimal 150 karakter" })
    readonly recipient_name: string;

    @IsString({ message: "Phone harus berupa teks" })
    @IsNotEmpty({ message: "Phone Harus Diisi" })
    @MaxLength(20, { message: "Phone maksimal 20 karakter" })
    readonly phone: string;

    @IsString({ message: "Address harus berupa teks" })
    @IsNotEmpty({ message: "Address Harus Diisi" })
    readonly address: string;

    @IsString({ message: "City harus berupa teks" })
    @IsNotEmpty({ message: "City Harus Diisi" })
    @MaxLength(100, { message: "City maksimal 100 karakter" })
    readonly city: string;

    @IsString({ message: "Postal code harus berupa teks" })
    @IsNotEmpty({ message: "Postal code Harus Diisi" })
    @MaxLength(10, { message: "Postal code maksimal 10 karakter" })
    readonly postal_code: string;
}