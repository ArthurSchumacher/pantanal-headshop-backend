import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from 'src/payment/payment.module';
import { CartModule } from 'src/cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PaymentModule,
    CartModule,
    OrderProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
