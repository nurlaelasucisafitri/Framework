import { Controller, Get, Param, Post, Put, Delete, Body, ParseUUIDPipe } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    // menampilkan semua buku
    @Get()
    getbooks() {
        return this.booksService.findAll();
    }

    // menambahkan data buku baru
    @Post()
    createbook(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    // menampilkan data buku berdasarkan id
    @Get(':id')
    getBookById(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.findById(id);
    }

    // update data buku berdasarkan id
    @Put(':id')
    updateBook(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(id, updateBookDto);
    }

    // menghapus data buku berdasarkan id
    @Delete(':id')
    deleteBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.remove(id);
    }
}
