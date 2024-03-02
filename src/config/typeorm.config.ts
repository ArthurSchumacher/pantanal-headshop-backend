import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('DB_TYPE'),
      synchronize: JSON.parse(this.configService.get<string>('DB_SYNCHRONIZE')),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      autoLoadEntities: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: JSON.parse(
        this.configService.get<string>('DB_MIGRATIONS_RUN'),
      ),
    };
  }
}
