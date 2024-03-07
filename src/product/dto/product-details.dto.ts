import { Expose, Type } from 'class-transformer';
import { ProductCategoryDto } from 'src/category/dto/product-category.dto';

export class ProductDetailsDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  sale: boolean;

  @Expose()
  discount: number;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  @Type(() => ProductCategoryDto)
  category: ProductCategoryDto;
}
