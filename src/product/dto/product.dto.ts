import { Expose, Type } from 'class-transformer';
import { ProductCategoryDto } from 'src/category/dto/product-category.dto';

export class ProductDto {
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
  description: boolean;

  @Expose()
  discount: number;

  @Expose()
  image: string;

  @Expose()
  @Type(() => ProductCategoryDto)
  category: ProductCategoryDto;
}
