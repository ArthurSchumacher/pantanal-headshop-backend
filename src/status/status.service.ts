import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    return this.statusRepo.save(createStatusDto);
  }

  async findAll() {
    return await this.statusRepo.find();
  }

  async findOne(id: number) {
    return await this.statusRepo.findOne({ where: { id } });
  }

  async delete(id: number) {
    const status = await this.statusRepo.findOne({ where: { id } });

    if (!status) {
      throw new NotFoundException('Status não encontrado para deleção.');
    }

    return this.statusRepo.remove(status);
  }
}
