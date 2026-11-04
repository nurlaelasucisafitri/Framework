import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { Order } from './entities/order.entity.js';
import { OrderItem } from '../order-items/entities/order-item.entity.js';
import { Book } from '../books/entities/book-entitiy.js';
import { Customer } from '../customers/entities/customer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Book, Customer])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
