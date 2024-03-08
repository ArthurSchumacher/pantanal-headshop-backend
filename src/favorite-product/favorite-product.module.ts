import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';

@Module({
  providers: [FavoriteProductService]
})
export class FavoriteProductModule {}
