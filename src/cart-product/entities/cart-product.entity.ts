import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Cart, (cart) => cart.cartProduct, {
    eager: true,
    nullable: true,
  })
  cart?: Cart;

  @ManyToOne(() => Product, (product) => product.cartProduct, {
    eager: true,
    nullable: true,
  })
  product?: Product;
}
