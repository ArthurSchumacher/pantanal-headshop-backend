import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FavoriteProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Favorite, (favorite) => favorite.favoriteProduct)
  favorite?: Favorite;

  @ManyToOne(() => Product, (product) => product.favoriteProduct)
  product?: Product;
}
