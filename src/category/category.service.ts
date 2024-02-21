import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.repo.create(createCategoryDto);
      return await this.repo.save(category);
    } catch (error) {
      throw new ConflictException(
        `Falha ao cadastrar categoria. e: ${error.message}`,
      );
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
<<<<<<< HEAD
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(
        `Falha ao encontrar categoria. e: ${error.message}`,
      );
=======
    const category = await this.repo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Falha ao encontrar categoria.');
>>>>>>> main
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.repo.update(id, updateCategoryDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao atualizar categoria. e: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const category = await this.findOne(id);
      return await this.repo.remove(category);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao remover categoria. e: ${error.message}`,
      );
    }
  }
}
