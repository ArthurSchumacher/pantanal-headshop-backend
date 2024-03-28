import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CreateStatusDto } from './dto/create-status.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StatusDto } from './dto/status.dto';

@Controller('status')
@Serialize(StatusDto)
export class StatusController {
  constructor(private statusService: StatusService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.delete(+id);
  }
}
