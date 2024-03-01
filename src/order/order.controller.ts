import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@CurrentUser() user: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  findAll(@CurrentUser() user: string) {
    return this.orderService.findAll(user);
  }
}
