import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentService } from 'src/payment/payment.service';
import { statusEnum } from 'src/status/enums/status.enum';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { Payment } from 'src/payment/entities/payment.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderStatusDto } from './dto/order-status.dto';
import { StatusService } from 'src/status/status.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private paymentService: PaymentService,
    private statusService: StatusService,
    private cartService: CartService,
    private orderProductService: OrderProductService,
  ) {}

  async saveOrder(
    userId: string,
    payment: Payment,
    createOrderDto: CreateOrderDto,
  ) {
    return await this.orderRepo.save({
      date: new Date(),
      payment: {
        id: payment.id,
      },
      status: {
        id: statusEnum.DONE,
      },
      user: {
        id: userId,
      },
      address: {
        id: createOrderDto.addressId,
      },
    });
  }

  async saveOrderProductUsingCart(cart: Cart, order: Order) {
    return await Promise.all(
      cart.cartProduct?.map((cartProduct) => {
        this.orderProductService.create(
          cartProduct.product?.id,
          order.id,
          cartProduct.product?.price,
          cartProduct.amount,
        );
      }),
    );
  }

  async adminFindAll() {
    return await this.orderRepo.find({
      relations: {
        status: true,
        orderProduct: true,
      },
    });
  }

  async adminFindOne(id: string) {
    return await this.orderRepo.findOne({
      where: { id },
      relations: {
        orderProduct: {
          product: true,
        },
        payment: true,
        status: true,
        address: true,
      },
    });
  }

  async adminUpdateOrderStatus(id: string, orderStatusDto: OrderStatusDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    const status = await this.statusService.findOne(orderStatusDto.statusId);
    order.status = status;
    return await this.orderRepo.save(order);
  }

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const cart = await this.cartService.findOne(userId, true);
    const payment = await this.paymentService.storePayment(
      createOrderDto,
      cart,
    );
    const order = await this.saveOrder(userId, payment, createOrderDto);

    await this.saveOrderProductUsingCart(cart, order);
    await this.cartService.remove(userId);

    return order;
  }

  async findAll(userId: string) {
    const orders = await this.orderRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        address: true,
        orderProduct: {
          product: true,
        },
        payment: true,
        status: true,
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Ordens de compra não encontradas.');
    }

    return orders;
  }
}
