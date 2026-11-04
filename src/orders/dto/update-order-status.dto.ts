import { IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
    @IsIn(['pending', 'paid', 'shipped', 'completed', 'cancelled'])
    status: string;
}
