import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';

export class OrderItemDto {
    @IsUUID()
    book_id: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @IsUUID()
    customer_id: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'Minimal 1 buku dalam pesanan' })
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
