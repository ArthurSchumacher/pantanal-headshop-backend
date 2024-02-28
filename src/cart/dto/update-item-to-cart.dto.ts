import { IsNumber } from 'class-validator';

export class UpdateItemToCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
