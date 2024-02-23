import { Expose } from 'class-transformer';

export class UserDetailsDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cpf: string;

  @Expose()
  phone: string;

  @Expose()
  password: string;
}
