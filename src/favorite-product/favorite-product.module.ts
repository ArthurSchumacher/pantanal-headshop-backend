import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct]), ProductModule],
  providers: [FavoriteProductService],
  exports: [FavoriteProductService],
})
export class FavoriteProductModule {}
