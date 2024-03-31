import { Expose } from 'class-transformer';

export class StatusDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
