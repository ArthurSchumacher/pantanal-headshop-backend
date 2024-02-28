import { IsNumber } from 'class-validator';

export class AddItemToCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
