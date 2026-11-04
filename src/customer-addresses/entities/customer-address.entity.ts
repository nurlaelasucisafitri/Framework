import * as typeorm from "typeorm";
import { Customer } from "../../customers/entities/customer.entity.js";

@typeorm.Entity({ name: 'customer_addresses' })
export class CustomerAddress {
    @typeorm.PrimaryGeneratedColumn('uuid')
    id: string;

    // customers (1) -> (N) customer_addresses
    @typeorm.ManyToOne(() => Customer, (customer) => customer.addresses, { nullable: false })
    @typeorm.JoinColumn({ name: 'customer_id' })
    customer: typeorm.Relation<Customer>;

    @typeorm.Column({ type: 'varchar', length: 150 })
    recipient_name: string;

    @typeorm.Column({ type: 'varchar', length: 20 })
    phone: string;

    @typeorm.Column({ type: 'text' })
    address: string;

    @typeorm.Column({ type: 'varchar', length: 100 })
    city: string;

    @typeorm.Column({ type: 'varchar', length: 10 })
    postal_code: string;

    @typeorm.CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @typeorm.UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}