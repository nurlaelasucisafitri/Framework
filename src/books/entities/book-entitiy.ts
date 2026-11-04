import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { Publisher } from '../../publishers/entities/publisher.entity.js';
import { BookAuthor } from '../../book-authors/entities/book-author.entity.js';

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    title: string;

    @Column({ type: 'varchar', length: 45, unique: true, nullable: true })
    isbn: string | null;

    @Column({ type: 'int', nullable: true })
    published_year: number | null;

    @Column({ type: 'boolean', default: true })
    is_available: boolean;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ type: 'uuid', name: 'category_id', nullable: true })
    category_id: string | null;

    @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category: Category | null;

    @Column({ type: 'uuid', name: 'publisher_id', nullable: true })
    publisher_id: string | null;

    @ManyToOne(() => Publisher, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'publisher_id' })
    publisher: Publisher | null;

    @OneToMany('BookAuthor', 'book')
    bookAuthors: BookAuthor[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;
}
