import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  addressId: string;

  @IsOptional()
  @IsNumber()
  amountPayments?: number;

  @IsOptional()
  @IsString()
  code_pix?: string;

  @IsOptional()
  @IsString()
  date_payment?: string;
}
