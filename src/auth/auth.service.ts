import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('Email must be unique.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const userToCreate: CreateUserDto = {
      ...createUserDto,
      password: hash,
    };

    return await this.userService.create(userToCreate);
  }

  async signIn({ email, password }: SignInUserDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials.');
    }

    const payload = {
      sub: user.id,
      username: user.email,
      typeUser: user.typeUser,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
