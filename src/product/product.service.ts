import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { SupabaseService } from 'src/supabase.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    private categoryService: CategoryService,
    private supabaseService: SupabaseService,
  ) {}

  async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
    try {
      const { data } = await this.supabaseService
        .getSupabaseClient()
        .storage.from('images')
        .upload(image.originalname, image.buffer, {
          upsert: true,
        });

      const product = this.repo.create({
        name: createProductDto.name,
        price: +createProductDto.price,
        description: createProductDto.description,
        stock: +createProductDto.stock,
        sale: createProductDto.sale.toString() === 'true',
        discount: +createProductDto.discount,
        image: data.path,
      });

      const category = await this.categoryService.findOne(
        createProductDto.categoryId,
      );
      product.category = category;

      return await this.repo.save(product);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao cadastrar produto. e: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.repo.find({
        relations: ['category'],
      });

      const signedUrlPromises = products.map(async (product) => {
        const { data } = await this.supabaseService
          .getSupabaseClient()
          .storage.from('images')
          .createSignedUrl(`${product.image}`, 60);

        product.image = data.signedUrl;
        return product;
      });

      const productsWithSignedUrls = await Promise.all(signedUrlPromises);

      return productsWithSignedUrls;
    } catch (error) {
      throw new BadRequestException(
        `Falha ao buscar produtos. e: ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.repo.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException('Produto não encontrado.');
      }

      const { data } = await this.supabaseService
        .getSupabaseClient()
        .storage.from('images')
        .createSignedUrl(`${product.image}`, 60);

      product.image = data.signedUrl;

      return product;
    } catch (error) {
      throw new NotFoundException(
        `Falha ao encontrar produto. e: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ) {
    try {
      const product = await this.repo.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Falha ao encontrar produto.`);
      }

      Object.assign(product, {
        name: updateProductDto.name,
        price: +updateProductDto.price,
        description: updateProductDto.description,
        stock: +updateProductDto.stock,
        sale: updateProductDto.sale,
        discount: +updateProductDto.discount,
      });

      if (updateProductDto.categoryId !== product.category.id) {
        const category = await this.categoryService.findOne(
          updateProductDto.categoryId,
        );

        if (!category) {
          throw new NotFoundException(`Falha ao encontrar categoria.`);
        }

        product.category = category;
      }

      if (image) {
        const { data } = await this.supabaseService
          .getSupabaseClient()
          .storage.from('images')
          .upload(image.originalname, image.buffer, {
            upsert: true,
          });
        Object.assign(product, {
          image: data.path,
        });
      }

      return await this.repo.save(product);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao atualizar produto. e: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const product = await this.repo.findOne({ where: { id } });
      return await this.repo.remove(product);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao remover produto. e: ${error.message}`,
      );
    }
  }
}
