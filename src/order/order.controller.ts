import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/cart/:id')
  create(
    @CurrentUser() user: string,
    @Param('id') id: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user, id, createOrderDto);
  }
}
