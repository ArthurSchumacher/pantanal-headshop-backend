import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Request } from 'express';
import { Public } from './decorators/is-public.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
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
    return this.userService.findOne(req['user'].sub);
  }
}
