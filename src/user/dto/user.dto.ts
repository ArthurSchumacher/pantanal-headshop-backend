import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  typeUser: number;

  @Expose()
  access_token?: string;
}
