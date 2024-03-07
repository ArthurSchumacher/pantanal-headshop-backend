import { Expose, Type } from 'class-transformer';
import { CartProductDto } from 'src/cart-product/dto/cart-product.dto';

export class CartDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => CartProductDto)
  cartProduct: CartProductDto;

  @Expose()
  _count: number;

  @Expose()
  _totalPrice: number;

  @Expose()
  message: string;
}
