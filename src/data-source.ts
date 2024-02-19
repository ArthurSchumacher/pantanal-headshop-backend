import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  database: 'ecommerce',
  entities: ['**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
} as DataSourceOptions);
