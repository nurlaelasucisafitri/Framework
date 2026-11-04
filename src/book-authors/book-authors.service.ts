import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookAuthor } from './entities/book-author.entity.js';
import { CreateBookAuthorDto } from './dto/create-book-author.dto.js';
import { Book } from '../books/entities/book-entitiy.js';
import { Author } from '../authors/entities/author.entity.js';

@Injectable()
export class BookAuthorsService {
    constructor(
        @InjectRepository(BookAuthor)
        private readonly bookAuthorRepository: Repository<BookAuthor>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {}

    async findAll(): Promise<BookAuthor[]> {
        return await this.bookAuthorRepository.find({ relations: { book: true, author: true } });
    }

    async create(dto: CreateBookAuthorDto): Promise<BookAuthor> {
        const book = await this.bookRepository.findOneBy({ id: dto.book_id });
        if (!book) {
            throw new NotFoundException(`Buku ${dto.book_id} tidak ditemukan`);
        }

        const author = await this.authorRepository.findOneBy({ id: dto.author_id });
        if (!author) {
            throw new NotFoundException(`Author ${dto.author_id} tidak ditemukan`);
        }

        const exists = await this.bookAuthorRepository.findOneBy({
            bookId: dto.book_id,
            authorId: dto.author_id,
        });
        if (exists) {
            throw new ConflictException('Author ini sudah terhubung ke buku tersebut');
        }

        await this.bookAuthorRepository.save(
            this.bookAuthorRepository.create({ bookId: dto.book_id, authorId: dto.author_id }),
        );

        return (await this.bookAuthorRepository.findOne({
            where: { bookId: dto.book_id, authorId: dto.author_id },
            relations: { book: true, author: true },
        }))!;
    }

    async remove(bookId: string, authorId: string): Promise<{ message: string }> {
        const row = await this.bookAuthorRepository.findOneBy({ bookId, authorId });
        if (!row) {
            throw new NotFoundException('Relasi buku-author tidak ditemukan');
        }
        await this.bookAuthorRepository.delete({ bookId, authorId });
        return { message: 'Relasi buku-author berhasil dihapus' };
    }
}
