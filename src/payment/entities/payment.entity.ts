import { Order } from 'src/order/entities/order.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Status, (status) => status.payments, { eager: true })
  status: Status;

  @OneToMany(() => Order, (order) => order.payment)
  orders: Order[];

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  final_price: number;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
