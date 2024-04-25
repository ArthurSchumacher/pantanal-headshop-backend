import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { Public } from 'src/auth/decorators/is-public.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @Public()
  contactMail(@Body() body: SendEmailDto) {
    return this.emailService.sendMail(body);
  }
}
