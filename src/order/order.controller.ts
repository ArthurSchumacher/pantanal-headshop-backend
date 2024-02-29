import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/cart/:id')
  create(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(id, createOrderDto);
  }
}
