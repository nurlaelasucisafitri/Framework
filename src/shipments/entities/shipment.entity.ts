import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Order } from '../../orders/entities/order.entity.js';

@Entity({ name: 'shipments' })
export class Shipment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne('Order', 'shipment', { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Relation<Order>;

    @Column({ type: 'varchar', length: 100 })
    courier: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    tracking_number: string | null;

    @Column({ type: 'varchar', length: 30, default: 'pending' })
    status: string;

    @Column({ type: 'timestamp', nullable: true })
    shipped_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    delivered_at: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
