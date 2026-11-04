import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePaymentDto {
    @IsUUID()
    order_id: string;

    @IsString()
    @IsNotEmpty({ message: 'Payment method harus diisi' })
    @MaxLength(50)
    payment_method: string;
}
