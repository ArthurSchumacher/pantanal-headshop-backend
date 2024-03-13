import { IsNumber } from 'class-validator';

export class AddItemToFavoritesDto {
  @IsNumber()
  productId: number;
}
