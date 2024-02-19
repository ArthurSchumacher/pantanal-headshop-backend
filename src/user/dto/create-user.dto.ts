import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
