import { Expose } from 'class-transformer';

export class AddressDto {
  @Expose()
  id: string;

  @Expose()
  cep: number;

  @Expose()
  street: string;

  @Expose()
  number: number;

  @Expose()
  district: string;

  @Expose()
  complement?: string;

  @Expose()
  city: string;

  @Expose()
  uf: string;
}
