import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {}

    async findAll(): Promise<Author[]> {
        return await this.authorRepository.find({ relations: { bookAuthors: { book: true } } });
    }

    async findById(id: string): Promise<Author> {
        const author = await this.authorRepository.findOne({
            where: { id },
            relations: { bookAuthors: { book: true } },
        });
        if (!author) {
            throw new NotFoundException(`Author ${id} tidak ditemukan`);
        }
        return author;
    }

    async create(dto: CreateAuthorDto): Promise<Author> {
        return await this.authorRepository.save(this.authorRepository.create(dto));
    }

    async update(id: string, dto: UpdateAuthorDto): Promise<Author> {
        const author = await this.findById(id);
        if (dto.name !== undefined) {
            author.name = dto.name;
        }
        await this.authorRepository.save(author);
        return await this.findById(id);
    }

    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);
        await this.authorRepository.delete(id);
        return { message: `Author ${id} berhasil dihapus`, deletedId: id };
    }
}
