import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { AddItemToCartDto } from 'src/cart/dto/add-item-to-cart.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { UpdateItemToCartDto } from 'src/cart/dto/update-item-to-cart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
    private productService: ProductService,
  ) {}

  async findOne(cartId: string, productId: number): Promise<CartProduct> {
    const cartProduct = await this.cartProductRepo.findOne({
      where: {
        cart: {
          id: cartId,
        },
        product: {
          id: productId,
        },
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Produto não encontrado no carrinho.');
    }

    return cartProduct;
  }

  async create(addItemToCartDto: AddItemToCartDto, cartId: string) {
    return await this.cartProductRepo.save({
      cart: {
        id: cartId,
      },
      product: {
        id: addItemToCartDto.productId,
      },
      amount: addItemToCartDto.amount,
    });
  }

  async insertProduct(
    addItemToCartDto: AddItemToCartDto,
    cart: Cart,
  ): Promise<CartProduct> {
    await this.productService.findOne(addItemToCartDto.productId);

    const cartProduct = await this.findOne(
      cart.id,
      addItemToCartDto.productId,
    ).catch(async () => undefined);

    if (!cartProduct) {
      return this.create(addItemToCartDto, cart.id);
    }

    return this.cartProductRepo.save({
      ...cartProduct,
      amount: cartProduct.amount + addItemToCartDto.amount,
    });
  }

  async updateProduct(
    updateItemToCartDto: UpdateItemToCartDto,
    cart: Cart,
  ): Promise<CartProduct> {
    await this.productService.findOne(updateItemToCartDto.productId);

    const cartProduct = await this.findOne(
      cart.id,
      updateItemToCartDto.productId,
    );

    if (!cartProduct) {
      throw new NotFoundException('Produto não encontrado no carrinho.');
    }

    return this.cartProductRepo.save({
      ...cartProduct,
      amount: updateItemToCartDto.amount,
    });
  }

  async removeProduct(productId: number, cartId: string) {
    const cartProduct = await this.cartProductRepo.findOne({
      where: {
        product: { id: productId },
        cart: { id: cartId },
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Produto não encontrado no carrinho.');
    }

    await this.cartProductRepo.remove(cartProduct);

    return {
      message: `Produto ${productId} removido com sucesso.`,
    };
  }
}
