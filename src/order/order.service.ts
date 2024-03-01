import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';
import { orderStatus } from 'src/status/enums/orderType.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private paymentService: PaymentService,
  ) {}

  async createOrder(
    userId: string,
    cartId: string,
    createOrderDto: CreateOrderDto,
  ) {
    const payment = await this.paymentService.storePayment(createOrderDto);

    const order = await this.orderRepo.save({
      date: new Date(),
      payment: {
        id: payment.id,
      },
      status: {
        id: orderStatus.PENDING,
      },
      user: {
        id: userId,
      },
    });

    return null;
  }
}
