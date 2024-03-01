import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
  ) {}

  async create(
    productId: number,
    orderId: string,
    price: number,
    amount: number,
  ) {
    return this.orderProductRepo.save({
      amount,
      price,
      product: {
        id: productId,
      },
      order: {
        id: orderId,
      },
    });
  }
}
