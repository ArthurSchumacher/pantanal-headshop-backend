import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentPix extends Payment {
  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  date_payment: Date;
}
