import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';

export class AccessTokenDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
  @Expose()
  access_token: string;
}
