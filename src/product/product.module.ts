import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { SupabaseService } from 'src/supabase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService, SupabaseService],
  exports: [ProductService],
})
export class ProductModule {}
