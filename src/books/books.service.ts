import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book dto.js';
import { Book } from './entities/book-entitiy.js';

@Injectable()
export class BooksService {
    private books: Book[] = [
        {
            id: 1,
            title: 'The Greatt Gaby',
            author: 'F, Scott Fitzgerald',
            isbn: '97878099754567',
            publishedYear: 1925,
            isAvailable: true,
        }
    ]

    // mencari semua data buku
    findAll(): Book[]{
        return this.books;
    }

    // menyimpan data buku baru

    private nextId = 2;

    create(dto: CreateBookDto): Book {
        const newBook: Book = {
            id: this.nextId++,
            title: dto.title,
            author: dto.author,
            isbn: dto.isbn,
            publishedYear: dto.publishedYear,
            isAvailable: true,
        };

        // simpan ke database
        this.books.push(newBook);
        return newBook;
    }
}
