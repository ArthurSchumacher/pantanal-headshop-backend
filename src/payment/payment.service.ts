import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { statusEnum } from 'src/status/enums/status.enum';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  async getFinalPrice(cart: Cart) {
    return cart.cartProduct
      .map((cartProduct) => {
        if (cartProduct.product.id) {
          if (cartProduct.product?.sale) {
            const discount =
              cartProduct.product?.price *
              (cartProduct.product?.discount / 100);
            const discountedPrice = cartProduct.product?.price - discount;
            return cartProduct.amount * discountedPrice;
          }

          return cartProduct.amount * cartProduct.product?.price;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  async getSubtotalPrice(cart: Cart) {
    return cart.cartProduct
      .map((cartProduct) => {
        if (cartProduct.product.id) {
          return cartProduct.amount * cartProduct.product?.price;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  async storeCreditCardPayment(
    price: number,
    final_price: number,
    createOrderDto: CreateOrderDto,
  ) {
    return await this.paymentRepo.save({
      price,
      discount: price - final_price,
      final_price,
      status: {
        id: statusEnum.DONE,
      },
      amountPayments: createOrderDto.amountPayments,
    });
  }

  async storePixPayment(
    price: number,
    final_price: number,
    createOrderDto: CreateOrderDto,
  ) {
    return await this.paymentRepo.save({
      price,
      discount: price - final_price,
      final_price,
      status: {
        id: statusEnum.DONE,
      },
      code: createOrderDto.code_pix,
      date_payment: createOrderDto.date_payment,
    });
  }

  async storePayment(createOrderDto: CreateOrderDto, cart: Cart) {
    const final_price = await this.getFinalPrice(cart);
    const price = await this.getSubtotalPrice(cart);

    if (createOrderDto.amountPayments) {
      return await this.storeCreditCardPayment(
        price,
        final_price,
        createOrderDto,
      );
    } else if (createOrderDto.code_pix && createOrderDto.date_payment) {
      return await this.storePixPayment(price, final_price, createOrderDto);
    }

    throw new BadRequestException('Falha ao criar ordem de compra.');
  }
}
