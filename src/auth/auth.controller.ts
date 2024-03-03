import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Public } from './decorators/is-public.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserService } from 'src/user/user.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @Serialize(UserDto)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  @Serialize(AccessTokenDto)
  async signIn(@Body() signInDto: SignInUserDto) {
    return await this.authService.signIn(signInDto);
  }
}
