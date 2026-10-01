import { Controller, Get, Param, Post, Put, Delete, Body} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    
    // menampilkan semua buku
    @Get()
    getbooks(){
        return this.booksService.findAll();
    }

    // menambahkan data buku baru
    @Post()
    createbook(@Body() CreateBookDto: CreateBookDto){
        return this.booksService.create(CreateBookDto);
    }

    // menampilkan data buku berdasarkan id
    @Get(':id')
    getBookById(@Param('id') id: string) {
        return `Data buku berdasarkan id: ${id}`;
    }

    // update data buku berdasarkan id
    @Put(':id')
    updateBook(@Param('id') id: string) {
        return `Data buku dengan id: ${id} berhasil diubah`;
    }

    // menghapus data buku berdasarkan id
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return `Data buku dengan id: ${id} berhasil dihapus`;
    }

}
