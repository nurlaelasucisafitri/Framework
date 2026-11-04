import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity.js';
import { OrderItem } from '../../order-items/entities/order-item.entity.js';
import { Payment } from '../../payments/entities/payment.entity.js';
import { Shipment } from '../../shipments/entities/shipment.entity.js';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { nullable: false })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ type: 'varchar', length: 50, unique: true })
    order_number: string;

    @Column({ type: 'varchar', length: 30, default: 'pending' })
    status: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    total_amount: number;

    @OneToMany('OrderItem', 'order')
    items: OrderItem[];

    @OneToOne('Payment', 'order')
    payment: Payment | null;

    @OneToOne('Shipment', 'order')
    shipment: Shipment | null;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
