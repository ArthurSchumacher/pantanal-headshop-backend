import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumberString()
  price: number;

  @IsString()
  description: string;

  @IsNumberString()
  stock: number;

  @IsBooleanString()
  sale: boolean;

  @IsOptional()
  @IsNumberString()
  discount?: number;

  @IsString()
  categoryId: string;
}
