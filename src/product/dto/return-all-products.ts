import { Expose, Type } from 'class-transformer';
import { ProductDto } from './product.dto';

export class ReturnAllProducts {
  @Expose()
  @Type(() => ProductDto)
  products: ProductDto[];

  @Expose()
  totalPages: number;
}
