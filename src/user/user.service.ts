import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.repo.create(createUserDto);
      return await this.repo.save(user);
    } catch (error) {
      throw new ConflictException(
        `Falha ao cadastrar usuário. e: ${error.message}`,
      );
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(
        `Falha ao encontrar usuário. e: ${error.message}`,
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.repo.findOne({ where: { email } });
    } catch (error) {
      throw new NotFoundException(
        `Falha ao encontrar usuário. e: ${error.message}`,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const salt = await bcrypt.genSalt();

      Object.assign(user, {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, salt),
      });

      return await this.repo.save(user);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao atualizar usuário. e: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      return this.repo.remove(user);
    } catch (error) {
      throw new BadRequestException(
        `Falha ao remover usuário. e: ${error.message}`,
      );
    }
  }
}
