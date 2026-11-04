import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ShipmentsService } from './shipments.service.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';

@Controller('shipments')
export class ShipmentsController {
    constructor(private readonly shipmentsService: ShipmentsService) {}

    @Get()
    findAll() {
        return this.shipmentsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.shipmentsService.findById(id);
    }

    @Post()
    create(@Body() dto: CreateShipmentDto) {
        return this.shipmentsService.create(dto);
    }

    @Patch(':id/ship')
    markShipped(@Param('id', ParseUUIDPipe) id: string) {
        return this.shipmentsService.markShipped(id);
    }

    @Patch(':id/deliver')
    markDelivered(@Param('id', ParseUUIDPipe) id: string) {
        return this.shipmentsService.markDelivered(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.shipmentsService.remove(id);
    }
}
