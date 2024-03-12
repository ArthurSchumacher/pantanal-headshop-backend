import { FavoriteProduct } from 'src/favorite-product/entities/favorite-product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => User, (user) => user.favorite)
  user?: User;

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.favorite,
  )
  favoriteProduct: FavoriteProduct[];
}
