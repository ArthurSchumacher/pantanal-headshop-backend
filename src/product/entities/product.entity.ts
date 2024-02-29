import { CartProduct } from 'src/cart-product/entities/cart-product.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column({ default: false })
  sale: boolean;

  @Column({ default: 0 })
  discount: number;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category?: Category;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProduct: CartProduct[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProduct: OrderProduct[];
}
