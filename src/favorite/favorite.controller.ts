import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddItemToFavoritesDto } from './dto/add-item-to-favorites.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { FavoriteDto } from './dto/favorite.dto';

@Controller('favorite')
@Serialize(FavoriteDto)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(
    @CurrentUser() user: string,
    @Body() addItemToFavoritesDto: AddItemToFavoritesDto,
  ) {
    return this.favoriteService.saveItem(user, addItemToFavoritesDto);
  }

  @Get()
  findAll(@CurrentUser() user: string) {
    return this.favoriteService.findOne(user, true);
  }

  @Delete()
  delete(@CurrentUser() user: string) {
    return this.favoriteService.remove(user);
  }

  @Delete('/product/:id')
  removeProduct(@CurrentUser() user: string, @Param('id') id: string) {
    return this.favoriteService.removeItem(user, +id);
  }
}
