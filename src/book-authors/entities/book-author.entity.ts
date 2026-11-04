import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Book } from '../../books/entities/book-entitiy.js';
import { Author } from '../../authors/entities/author.entity.js';

@Entity({ name: 'book_authors' })
export class BookAuthor {
    @PrimaryColumn({ type: 'uuid', name: 'book_id' })
    bookId: string;

    @PrimaryColumn({ type: 'uuid', name: 'author_id' })
    authorId: string;

    @ManyToOne('Book', 'bookAuthors', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Relation<Book>;

    @ManyToOne('Author', 'bookAuthors', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: Relation<Author>;
}
