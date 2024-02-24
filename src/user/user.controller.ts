import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { UserDetailsDto } from './dto/user-details.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Serialize(UserDetailsDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Serialize(UserDetailsDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Serialize(UserDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
