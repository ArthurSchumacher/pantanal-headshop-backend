import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { UpdateItemToCartDto } from './dto/update-item-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    private cartProductService: CartProductService,
  ) {}

  async findOne(userId: string, isRelations?: boolean) {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepo.findOne({
      where: {
        isActive: true,
        user: {
          id: userId,
        },
      },
      relations,
    });

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }

    return {
      ...cart,
      _count: relations ? cart.cartProduct.length : undefined,
    };
  }

  async create(userId: string) {
    return this.cartRepo.save({
      isActive: true,
      user: {
        id: userId,
      },
    });
  }

  async createItem(
    userId: string,
    addItemToCartDto: AddItemToCartDto,
  ): Promise<Cart> {
    const cart = await this.findOne(userId).catch(async () => {
      return this.create(userId);
    });

    await this.cartProductService.insertProduct(addItemToCartDto, cart);

    return cart;
  }

  async updateItem(userId: string, updateItemToCartDto: UpdateItemToCartDto) {
    const cart = await this.findOne(userId).catch(async () => {
      return this.create(userId);
    });

    await this.cartProductService.updateProduct(updateItemToCartDto, cart);

    return cart;
  }

  async remove(userId: string): Promise<Cart> {
    const cart = await this.findOne(userId);
    cart.isActive = false;
    return this.cartRepo.save(cart);
  }

  async removeItem(userId: string, productId: number) {
    const cart = await this.findOne(userId);
    return await this.cartProductService.removeProduct(productId, cart.id);
  }
}
