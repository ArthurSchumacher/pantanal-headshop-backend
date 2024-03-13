import { FavoriteProduct } from 'src/favorite-product/entities/favorite-product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  user?: User;

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.favorite,
  )
  favoriteProduct: FavoriteProduct[];
}
