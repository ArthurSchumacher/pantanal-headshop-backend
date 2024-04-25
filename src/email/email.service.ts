import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
    return transporter;
  }

  async sendMail(dto: SendEmailDto) {
    const { name, email, subject, message } = dto;
    const transport = this.mailTransport();
    const options: Mail.Options = {
      from: email,
      to: [this.configService.get<string>('DEFAULT_TO')],
      subject,
      text: `Enviado por ${name}: ${message}`,
    };

    try {
      return await transport.sendMail(options);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
