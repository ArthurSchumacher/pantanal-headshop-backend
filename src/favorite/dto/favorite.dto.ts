import { Expose, Type } from 'class-transformer';
import { FavoriteProductDto } from 'src/favorite-product/dto/favorite-product.dto';

export class FavoriteDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => FavoriteProductDto)
  favoriteProduct: FavoriteProductDto;

  @Expose()
  message: string;
}
