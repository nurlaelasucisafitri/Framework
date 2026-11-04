import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';

@Injectable()
export class ShipmentsService {
    constructor(
        @InjectRepository(Shipment)
        private readonly shipmentRepository: Repository<Shipment>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async findAll(): Promise<Shipment[]> {
        return await this.shipmentRepository.find({ relations: { order: true } });
    }

    async findById(id: string): Promise<Shipment> {
        const shipment = await this.shipmentRepository.findOne({
            where: { id },
            relations: { order: true },
        });
        if (!shipment) {
            throw new NotFoundException(`Shipment ${id} tidak ditemukan`);
        }
        return shipment;
    }

    async create(dto: CreateShipmentDto): Promise<Shipment> {
        const order = await this.orderRepository.findOneBy({ id: dto.order_id });
        if (!order) {
            throw new NotFoundException(`Order ${dto.order_id} tidak ditemukan`);
        }

        const exists = await this.shipmentRepository.findOne({
            where: { order: { id: dto.order_id } },
        });
        if (exists) {
            throw new ConflictException('Order ini sudah memiliki pengiriman');
        }

        const shipment = await this.shipmentRepository.save(
            this.shipmentRepository.create({
                order,
                courier: dto.courier,
                tracking_number: dto.tracking_number ?? null,
                status: 'pending',
            }),
        );

        return await this.findById(shipment.id);
    }

    // barang dikirim -> status order 'shipped'
    async markShipped(id: string): Promise<Shipment> {
        const shipment = await this.findById(id);

        await this.shipmentRepository.update(id, { status: 'shipped', shipped_at: new Date() });
        await this.orderRepository.update(shipment.order.id, { status: 'shipped' });

        return await this.findById(id);
    }

    // barang sampai -> status order 'completed'
    async markDelivered(id: string): Promise<Shipment> {
        const shipment = await this.findById(id);

        await this.shipmentRepository.update(id, {
            status: 'delivered',
            delivered_at: new Date(),
        });
        await this.orderRepository.update(shipment.order.id, { status: 'completed' });

        return await this.findById(id);
    }

    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);
        await this.shipmentRepository.delete(id);
        return { message: `Shipment ${id} berhasil dihapus`, deletedId: id };
    }
}
