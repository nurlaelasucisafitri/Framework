import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerAddressesService } from './customer-addresses.service.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Controller('customer-addresses')
export class CustomerAddressesController {
    constructor(private readonly customerAddressesService: CustomerAddressesService) {}

    @Get()
    getAddresses() {
        return this.customerAddressesService.findAll();
    }

    @Get(':id')
    getAddressById(@Param('id') id: string) {
        return this.customerAddressesService.findById(id);
    }

    @Post()
    createAddress(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
        return this.customerAddressesService.create(createCustomerAddressDto);
    }

    @Put(':id')
    updateAddress(@Param('id') id: string, @Body() updateCustomerAddressDto: UpdateCustomerAddressDto) {
        return this.customerAddressesService.update(id, updateCustomerAddressDto);
    }

    @Delete(':id')
    deleteAddress(@Param('id') id: string) {
        return this.customerAddressesService.remove(id);
    }
}