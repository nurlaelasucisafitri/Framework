import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book dto.js';
import { Book } from './entities/book-entitiy.js';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    // mencari semua data buku
    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    // menyimpan data buku baru
    async create(book: CreateBookDto): Promise<Book> {
        const newBook = this.bookRepository.create(book);

        return await this.bookRepository.save(newBook);
    }
}