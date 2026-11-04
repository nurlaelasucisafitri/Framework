import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { BookAuthorsService } from './book-authors.service.js';
import { CreateBookAuthorDto } from './dto/create-book-author.dto.js';

@Controller('book-authors')
export class BookAuthorsController {
    constructor(private readonly bookAuthorsService: BookAuthorsService) {}

    @Get()
    findAll() {
        return this.bookAuthorsService.findAll();
    }

    @Post()
    create(@Body() dto: CreateBookAuthorDto) {
        return this.bookAuthorsService.create(dto);
    }

    @Delete(':bookId/:authorId')
    remove(
        @Param('bookId', ParseUUIDPipe) bookId: string,
        @Param('authorId', ParseUUIDPipe) authorId: string,
    ) {
        return this.bookAuthorsService.remove(bookId, authorId);
    }
}
