import { IsNumberString } from 'class-validator';

export class OrderStatusDto {
  @IsNumberString()
  statusId: number;
}
