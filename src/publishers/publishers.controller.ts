import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PublishersService } from './publishers.service.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Controller('publishers')
export class PublishersController {
    constructor(private readonly publishersService: PublishersService) {}

    @Get()
    getPublishers() {
        return this.publishersService.findAll();
    }

    @Get(':id')
    getPublisherById(@Param('id') id: string) {
        return this.publishersService.findById(id);
    }

    @Post()
    createPublisher(@Body() createPublisherDto: CreatePublisherDto) {
        return this.publishersService.create(createPublisherDto);
    }

    @Put(':id')
    updatePublisher(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
        return this.publishersService.update(id, updatePublisherDto);
    }

    @Delete(':id')
    deletePublisher(@Param('id') id: string) {
        return this.publishersService.remove(id);
    }
}