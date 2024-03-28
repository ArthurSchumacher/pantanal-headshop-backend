import { Expose, Type } from 'class-transformer';
import { OrderProductAmountDto } from 'src/order-product/dto/order-product-amount.dto';
import { StatusDto } from 'src/status/dto/status.dto';

export class FindAllDto {
  @Expose()
  id: string;

  @Expose()
  created_at: string;

  @Expose()
  @Type(() => StatusDto)
  status: StatusDto;

  @Expose()
  @Type(() => OrderProductAmountDto)
  orderProduct: OrderProductAmountDto;
}
