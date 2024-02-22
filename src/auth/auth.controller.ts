import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Request } from 'express';
import { Public } from './decorators/is-public.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Serialize(UserDto)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInUserDto) {
    return await this.authService.signIn(signInDto);
  }

  @Get('whoami')
  getProfile(@Req() req: Request) {
    return req['user'];
  }
}
