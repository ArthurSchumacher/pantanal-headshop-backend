import { Expose, Type } from 'class-transformer';
import { ProductDto } from 'src/product/dto/product.dto';

export class FavoriteProductDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => ProductDto)
  product?: ProductDto;
}
