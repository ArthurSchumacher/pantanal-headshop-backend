import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { FavoriteProductService } from 'src/favorite-product/favorite-product.service';
import { AddItemToFavoritesDto } from './dto/add-item-to-favorites.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private favoriteRepo: Repository<Favorite>,
    private favoriteProductService: FavoriteProductService,
  ) {}

  async create(userId: string) {
    return await this.favoriteRepo.save({
      user: {
        id: userId,
      },
    });
  }

  async findOne(userId: string, isRelations?: boolean) {
    const relations = isRelations
      ? {
          favoriteProduct: {
            product: true,
          },
          user: false,
        }
      : undefined;

    const favorites = await this.favoriteRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations,
    });

    if (!favorites) {
      throw new NotFoundException('Favorite not found.');
    }

    return favorites;
  }

  async saveItem(
    userId: string,
    addItemToFavoritesDto: AddItemToFavoritesDto,
  ): Promise<Favorite> {
    const favorite = await this.findOne(userId).catch(async () => {
      return await this.create(userId);
    });

    await this.favoriteProductService.insertProduct(
      addItemToFavoritesDto,
      favorite,
    );

    return favorite;
  }

  async removeItem(userId: string, productId: number) {
    const favorite = await this.findOne(userId);
    return await this.favoriteProductService.removeProduct(
      productId,
      favorite.id,
    );
  }

  async remove(userId: string) {
    const favorite = await this.findOne(userId, true);

    favorite.favoriteProduct.forEach(async (favoriteProduct) => {
      return await this.favoriteProductService.removeProduct(
        favoriteProduct.product.id,
        favorite.id,
      );
    });

    await this.favoriteRepo.remove(favorite);

    return { message: 'Favoritos limpos com sucesso.' };
  }
}
