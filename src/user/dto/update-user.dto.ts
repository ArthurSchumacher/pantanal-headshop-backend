import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsInt,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ROLE } from '../enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsInt()
  userType: ROLE;
}
