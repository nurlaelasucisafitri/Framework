import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from './entities/customer-address.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Injectable()
export class CustomerAddressesService {
    constructor(
        @InjectRepository(CustomerAddress)
        private readonly addressRepository: Repository<CustomerAddress>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async findAll(): Promise<CustomerAddress[]> {
        return await this.addressRepository.find({ relations: { customer: true } });
    }

    async findById(id: string): Promise<CustomerAddress> {
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: { customer: true },
        });

        if (!address) {
            throw new NotFoundException(`Alamat ${id} tidak ditemukan`);
        }

        return address;
    }

    async create(dto: CreateCustomerAddressDto): Promise<CustomerAddress> {
        // pastikan pelanggannya ada
        const customer = await this.customerRepository.findOne({
            where: { id: dto.customer_id },
        });

        if (!customer) {
            throw new NotFoundException(`Pelanggan ${dto.customer_id} tidak ditemukan`);
        }

        const { customer_id, ...data } = dto;

        const newAddress = this.addressRepository.create({ ...data, customer });

        return await this.addressRepository.save(newAddress);
    }

    async update(id: string, dto: UpdateCustomerAddressDto): Promise<CustomerAddress> {
        const address = await this.findById(id);

        const updatedAddress = this.addressRepository.merge(address, dto);

        return await this.addressRepository.save(updatedAddress);
    }

    // tabel customer_addresses tidak punya deleted_at, jadi dihapus permanen
    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);

        await this.addressRepository.delete(id);

        return {
            message: `Alamat ${id} berhasil dihapus`,
            deletedId: id,
        };
    }
}