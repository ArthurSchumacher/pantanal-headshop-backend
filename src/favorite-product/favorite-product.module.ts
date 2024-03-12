import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct])],
  providers: [FavoriteProductService],
})
export class FavoriteProductModule {}
