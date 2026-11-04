import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find({ relations: { order: true } });
    }

    async findById(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: { order: true },
        });
        if (!payment) {
            throw new NotFoundException(`Payment ${id} tidak ditemukan`);
        }
        return payment;
    }

    // jumlah bayar diambil dari total_amount order
    async create(dto: CreatePaymentDto): Promise<Payment> {
        const order = await this.orderRepository.findOneBy({ id: dto.order_id });
        if (!order) {
            throw new NotFoundException(`Order ${dto.order_id} tidak ditemukan`);
        }

        const exists = await this.paymentRepository.findOne({
            where: { order: { id: dto.order_id } },
        });
        if (exists) {
            throw new ConflictException('Order ini sudah memiliki pembayaran');
        }

        const payment = await this.paymentRepository.save(
            this.paymentRepository.create({
                order,
                payment_method: dto.payment_method,
                amount: Number(order.total_amount),
                status: 'pending',
            }),
        );

        return await this.findById(payment.id);
    }

    // konfirmasi pembayaran -> status order jadi 'paid'
    async confirm(id: string): Promise<Payment> {
        const payment = await this.findById(id);

        await this.paymentRepository.update(id, { status: 'paid', paid_at: new Date() });
        await this.orderRepository.update(payment.order.id, { status: 'paid' });

        return await this.findById(id);
    }

    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);
        await this.paymentRepository.delete(id);
        return { message: `Payment ${id} berhasil dihapus`, deletedId: id };
    }
}
