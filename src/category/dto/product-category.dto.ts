import { Expose } from 'class-transformer';

export class ProductCategoryDto {
  @Expose()
  name: string;
}
