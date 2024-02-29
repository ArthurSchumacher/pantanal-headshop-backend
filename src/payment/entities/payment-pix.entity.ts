import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentPix extends Payment {
  @Column()
  code: string;

  @Column()
  date_payment: Date;
}
