import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.repo.create(createUserDto);
      return await this.repo.save(user);
    } catch (error) {
      throw new ConflictException('Falha ao cadastrar usuário.');
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Falha ao buscar usuário.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      Object.assign(user, updateUserDto);
      return await this.repo.save(user);
    } catch (error) {
      throw new BadRequestException('Falha ao atualizar usuário.');
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      return this.repo.remove(user);
    } catch (error) {
      throw new BadRequestException('Falha ao remover usuário.');
    }
  }
}
