import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from '../enums/role.enum';
import { Address } from 'src/address/entities/address.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  cpf: string;

  @Column({ default: ROLE.USER })
  typeUser: ROLE;

  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
