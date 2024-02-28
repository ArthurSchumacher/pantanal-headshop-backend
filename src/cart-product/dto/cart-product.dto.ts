import { Expose, Type } from 'class-transformer';
import { ProductDto } from 'src/product/dto/product.dto';

export class CartProductDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  @Type(() => ProductDto)
  product?: ProductDto;
}
