import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CartDto } from './dto/cart.dto';
import { UpdateItemToCartDto } from './dto/update-item-to-cart.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('cart')
@Serialize(CartDto)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(
    @Body() addItemToCartDto: AddItemToCartDto,
    @CurrentUser() user: string,
  ) {
    return this.cartService.createItem(user, addItemToCartDto);
  }

  @Get()
  findOne(@CurrentUser() user: string) {
    return this.cartService.findOne(user, true);
  }

  @Patch()
  update(
    @Body() updateItemToCartDto: UpdateItemToCartDto,
    @CurrentUser() user: string,
  ) {
    return this.cartService.updateItem(user, updateItemToCartDto);
  }

  @Delete()
  remove(@CurrentUser() user: string) {
    return this.cartService.remove(user);
  }

  @Delete('/product/:id')
  removeProduct(@Param('id') id: string, @CurrentUser() user: string) {
    return this.cartService.removeItem(user, +id);
  }
}
