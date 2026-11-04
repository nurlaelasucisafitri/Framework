import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateShipmentDto {
    @IsUUID()
    order_id: string;

    @IsString()
    @IsNotEmpty({ message: 'Courier harus diisi' })
    @MaxLength(100)
    courier: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    tracking_number?: string;
}
