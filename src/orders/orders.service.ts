import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
import { OrderItem } from '../order-items/entities/order-item.entity.js';
import { Book } from '../books/entities/book-entitiy.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly dataSource: DataSource,
    ) {}

    private readonly relations = {
        customer: true,
        items: { book: true },
        payment: true,
        shipment: true,
    };

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find({ relations: this.relations });
    }

    async findById(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: this.relations,
        });
        if (!order) {
            throw new NotFoundException(`Order ${id} tidak ditemukan`);
        }
        return order;
    }

    // membuat order + order_items, stok buku berkurang (satu transaksi)
    async create(dto: CreateOrderDto): Promise<Order> {
        const orderId = await this.dataSource.transaction(async (manager) => {
            const customer = await manager.findOneBy(Customer, { id: dto.customer_id });
            if (!customer) {
                throw new NotFoundException(`Customer ${dto.customer_id} tidak ditemukan`);
            }

            let total = 0;
            const items: OrderItem[] = [];

            for (const item of dto.items) {
                const book = await manager.findOneBy(Book, { id: item.book_id });
                if (!book) {
                    throw new NotFoundException(`Buku ${item.book_id} tidak ditemukan`);
                }
                if (!book.is_available || book.stock < item.quantity) {
                    throw new BadRequestException(`Stok buku "${book.title}" tidak cukup`);
                }

                const price = Number(book.price);
                const subtotal = price * item.quantity;
                total += subtotal;

                book.stock -= item.quantity;
                await manager.save(book);

                items.push(
                    manager.create(OrderItem, {
                        book,
                        quantity: item.quantity,
                        price,
                        subtotal,
                    }),
                );
            }

            const order = await manager.save(
                manager.create(Order, {
                    customer,
                    order_number: `ORD-${Date.now()}`,
                    status: 'pending',
                    total_amount: total,
                }),
            );

            for (const item of items) {
                item.order = order;
            }
            await manager.save(items);

            return order.id;
        });

        return await this.findById(orderId);
    }

    async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order> {
        await this.findById(id);
        await this.orderRepository.update(id, { status: dto.status });
        return await this.findById(id);
    }

    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);
        await this.orderRepository.delete(id);
        return { message: `Order ${id} berhasil dihapus`, deletedId: id };
    }
}
