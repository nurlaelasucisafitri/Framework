import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>,
    ) {}

    async findAll(): Promise<Publisher[]> {
        return await this.publisherRepository.find();
    }

    async findById(id: string): Promise<Publisher> {
        const publisher = await this.publisherRepository.findOne({ where: { id } });

        if (!publisher) {
            throw new NotFoundException(`Penerbit ${id} tidak ditemukan`);
        }

        return publisher;
    }

    async create(dto: CreatePublisherDto): Promise<Publisher> {
        const newPublisher = this.publisherRepository.create(dto);

        return await this.publisherRepository.save(newPublisher);
    }

    async update(id: string, dto: UpdatePublisherDto): Promise<Publisher> {
        const publisher = await this.findById(id);

        const updatedPublisher = this.publisherRepository.merge(publisher, dto);

        return await this.publisherRepository.save(updatedPublisher);
    }

    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);

        await this.publisherRepository.delete(id);

        return {
            message: `Penerbit ${id} berhasil dihapus`,
            deletedId: id,
        };
    }
}