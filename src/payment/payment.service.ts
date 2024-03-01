import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { paymentStatus } from 'src/status/enums/paymentStatus.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  async storePayment(createOrderDto: CreateOrderDto) {
    if (createOrderDto.amountPayments) {
      return await this.paymentRepo.save({
        price: 0,
        discount: 0,
        final_price: 0,
        status: {
          id: paymentStatus.DONE,
        },
        amountPayments: createOrderDto.amountPayments,
      });
    } else if (createOrderDto.code_pix && createOrderDto.date_payment) {
      return await this.paymentRepo.save({
        price: 0,
        discount: 0,
        final_price: 0,
        status: {
          id: paymentStatus.DONE,
        },
        code: createOrderDto.code_pix,
        date_payment: createOrderDto.date_payment,
      });
    }

    throw new BadRequestException('Falha ao criar ordem de compra.');
  }
}
