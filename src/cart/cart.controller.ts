import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { Request } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CartDto } from './dto/cart.dto';
import { UpdateItemToCartDto } from './dto/update-item-to-cart.dto';

@Controller('cart')
@Serialize(CartDto)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() addItemToCartDto: AddItemToCartDto, @Req() req: Request) {
    return this.cartService.createItem(req['user'].sub, addItemToCartDto);
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.cartService.findOne(req['user'].sub, true);
  }

  @Patch()
  update(
    @Body() updateItemToCartDto: UpdateItemToCartDto,
    @Req() req: Request,
  ) {
    return this.cartService.updateItem(req['user'].sub, updateItemToCartDto);
  }

  @Delete()
  remove(@Req() req: Request) {
    return this.cartService.remove(req['user'].sub);
  }

  @Delete('/product/:id')
  removeProduct(@Param('id') id: string, @Req() req: Request) {
    return this.cartService.removeItem(req['user'].sub, +id);
  }
}
