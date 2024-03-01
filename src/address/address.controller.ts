import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AddressDto } from './dto/address.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Serialize(AddressDto)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @CurrentUser() user: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return await this.addressService.create(user, createAddressDto);
  }

  @Get()
  findAll(@CurrentUser() user: string) {
    return this.addressService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
