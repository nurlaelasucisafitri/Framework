import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { Book } from './entities/book-entitiy.js';
import { Category } from '../categories/entities/category.entity.js';
import { Publisher } from '../publishers/entities/publisher.entity.js';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>,
    ) {}

    private readonly relations = {
        category: true,
        publisher: true,
        bookAuthors: { author: true },
    };

    // mencari semua data buku
    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find({ relations: this.relations });
    }

    // mencari satu buku berdasarkan id
    async findById(id: string): Promise<Book> {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: this.relations,
        });

        if (!book) {
            throw new NotFoundException(`Buku ${id} tidak ditemukan`);
        }

        return book;
    }

    // memastikan kategori & penerbit yang dipilih ada
    private async checkRelations(categoryId?: string, publisherId?: string) {
        if (categoryId) {
            const category = await this.categoryRepository.findOneBy({ id: categoryId });
            if (!category) {
                throw new NotFoundException(`Kategori ${categoryId} tidak ditemukan`);
            }
        }
        if (publisherId) {
            const publisher = await this.publisherRepository.findOneBy({ id: publisherId });
            if (!publisher) {
                throw new NotFoundException(`Penerbit ${publisherId} tidak ditemukan`);
            }
        }
    }

    // menyimpan data buku baru
    async create(book: CreateBookDto): Promise<Book> {
        await this.checkRelations(book.category_id, book.publisher_id);

        const newBook = this.bookRepository.create(book);
        const saved = await this.bookRepository.save(newBook);

        return await this.findById(saved.id);
    }

    // mengubah data buku
    async update(id: string, updateBook: UpdateBookDto): Promise<Book> {
        await this.findById(id);
        await this.checkRelations(updateBook.category_id, updateBook.publisher_id);

        // buang field yang tidak dikirim supaya tidak menimpa data lama
        const data = Object.fromEntries(
            Object.entries(updateBook).filter(([, value]) => value !== undefined),
        ) as UpdateBookDto;

        if (Object.keys(data).length > 0) {
            await this.bookRepository.update(id, data);
        }

        return await this.findById(id);
    }

    // menghapus buku (soft delete)
    async remove(id: string): Promise<{ message: string; deletedId: string }> {
        await this.findById(id);

        await this.bookRepository.softDelete(id);

        return {
            message: `Buku ${id} berhasil dihapus`,
            deletedId: id,
        };
    }
}
