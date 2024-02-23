import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private repo: Repository<Address>,
    private userService: UserService,
  ) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Your session expired.');
    }

    try {
      const address = this.repo.create(createAddressDto);
      address.user = user;
      return await this.repo.save(address);
    } catch (error) {
      throw new BadRequestException('Falha ao criar endereço.');
    }
  }

  async findAll(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Your session expired.');
    }

    try {
      return this.repo.find({
        where: {
          user: {
            id: userId,
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Falha ao buscar endereços.');
    }
  }

  async findOne(id: string) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Falha ao buscar endereço.');
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try {
      const address = await this.findOne(id);
      if (!address) {
        throw new NotFoundException('Falha ao buscar endereço.');
      }

      Object.assign(address, updateAddressDto);
      return await this.repo.save(address);
    } catch (error) {
      throw new BadRequestException('Falha ao atualizar endereço.');
    }
  }

  async remove(id: string) {
    try {
      const address = await this.findOne(id);
      return await this.repo.remove(address);
    } catch (error) {
      throw new BadRequestException('Falha ao remover endereço.');
    }
  }
}
