import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
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
