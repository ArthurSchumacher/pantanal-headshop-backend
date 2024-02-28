import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { Request } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
@Serialize(CartDto)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() addItemToCartDto: AddItemToCartDto, @Req() req: Request) {
    return this.cartService.insertItem(req['user'].sub, addItemToCartDto);
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.cartService.findOne(req['user'].sub, true);
  }

  @Delete()
  remove(@Req() req: Request) {
    return this.cartService.remove(req['user'].sub);
  }
}
