import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsInt,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ROLE } from '../enums/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsInt()
  typeUser: ROLE;
}
