import { Expose } from 'class-transformer';

export class StatusDto {
  @Expose()
  name: string;
}
