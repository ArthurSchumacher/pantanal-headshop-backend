import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemToFavoritesDto } from 'src/favorite/dto/add-item-to-favorites.dto';
import { ProductService } from 'src/product/product.service';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteProductService {
  constructor(
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepo: Repository<FavoriteProduct>,
    private productService: ProductService,
  ) {}

  async findOne(
    favoriteId: string,
    productId: number,
  ): Promise<FavoriteProduct> {
    const favoriteProduct = await this.favoriteProductRepo.findOne({
      where: {
        favorite: {
          id: favoriteId,
        },
        product: {
          id: productId,
        },
      },
    });

    if (!favoriteProduct) {
      throw new NotFoundException('Produto não encontrado aos favoritos.');
    }

    return favoriteProduct;
  }

  async create(
    addItemToFavoriteDto: AddItemToFavoritesDto,
    favoriteId: string,
  ) {
    return await this.favoriteProductRepo.save({
      favorite: {
        id: favoriteId,
      },
      product: {
        id: addItemToFavoriteDto.productId,
      },
    });
  }

  async insertProduct(
    addItemToFavoriteDto: AddItemToFavoritesDto,
    favorites: Favorite,
  ): Promise<FavoriteProduct> {
    await this.productService.findOne(addItemToFavoriteDto.productId);
    const favoriteProduct = await this.findOne(
      favorites.id,
      addItemToFavoriteDto.productId,
    ).catch(async () => undefined);

    if (!favoriteProduct) {
      return this.create(addItemToFavoriteDto, favorites.id);
    }
    return favoriteProduct;
  }

  async removeProduct(productId: number, favoriteId: string) {
    const favoriteProduct = await this.favoriteProductRepo.findOne({
      where: {
        product: { id: productId },
        favorite: { id: favoriteId },
      },
    });

    if (!favoriteProduct) {
      throw new NotFoundException('Produto não encontrado no carrinho.');
    }

    await this.favoriteProductRepo.remove(favoriteProduct);

    return {
      message: `Produto ${productId} removido com sucesso.`,
    };
  }
}
