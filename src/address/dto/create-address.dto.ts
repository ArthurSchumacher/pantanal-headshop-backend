import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  cep: number;

  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsString()
  district: string;

  @IsEmpty()
  complement?: string;

  @IsString()
  city: string;

  @IsString()
  uf: string;
}
