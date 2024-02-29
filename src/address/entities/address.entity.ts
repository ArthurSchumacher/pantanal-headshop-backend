import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  district: string;

  @Column()
  complement?: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user?: User;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
