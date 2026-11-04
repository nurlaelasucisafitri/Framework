import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find({ relations: { addresses: true } });
    }

    async findById(id: string): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: { id },
            relations: { addresses: true },
        });

        if (!customer) {
            throw new NotFoundException(`Pelanggan ${id} tidak ditemukan`);
        }

        return customer;
    }

    async create(dto: CreateCustomerDto): Promise<Customer> {
        await this.checkEmailUnique(dto.email);

        const newCustomer = this.customerRepository.create(dto);

        return await this.customerRepository.save(newCustomer);
    }

    async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.findById(id);

        if (dto.email && dto.email !== customer.email) {
            await this.checkEmailUnique(dto.email);
        }

        const updatedCustomer = this.customerRepository.merge(customer, dto);

        return await this.customerRepository.save(updatedCustomer);
    }

    // soft delete (tabel customers punya deleted_at)
    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);

        await this.customerRepository.softDelete(id);

        return {
            message: `Pelanggan ${id} berhasil dihapus`,
            deletedId: id,
        };
    }

    // email harus unik (sesuai PDF)
    private async checkEmailUnique(email: string): Promise<void> {
        const exists = await this.customerRepository.findOne({ where: { email } });

        if (exists) {
            throw new ConflictException(`Email "${email}" sudah terdaftar`);
        }
    }
}