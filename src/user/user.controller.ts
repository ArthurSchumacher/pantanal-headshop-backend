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
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Serialize(UserDetailsDto)
  @UseGuards(AdminGuard)
  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Serialize(UserDetailsDto)
  @Get('me')
  profile(@CurrentUser() user: string) {
    return this.userService.findOne(user);
  }

  @Serialize(UserDetailsDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Serialize(UserDetailsDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
