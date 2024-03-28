import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { OrderStatusDto } from './dto/order-status.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { FindAllDto } from './dto/find-all.dto';

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

  @UseGuards(AdminGuard)
  @Get('/admin')
  @Serialize(FindAllDto)
  adminFindAll() {
    return this.orderService.adminFindAll();
  }

  @UseGuards(AdminGuard)
  @Get('/admin/:id')
  adminFindOne(@Param('id') id: string) {
    return this.orderService.adminFindOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch('/admin/:id')
  adminUpdateStatus(
    @Param('id') id: string,
    @Body() orderStatusDto: OrderStatusDto,
  ) {
    return this.orderService.adminUpdateOrderStatus(id, orderStatusDto);
  }
}
