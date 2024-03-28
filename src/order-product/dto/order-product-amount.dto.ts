import { Expose } from 'class-transformer';

export class OrderProductAmountDto {
  @Expose()
  amount: number;
}
