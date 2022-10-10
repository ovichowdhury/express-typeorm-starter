/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const ormConfigBase = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, './entity/**/*.entity.js')],
  migrations: [path.join(__dirname, './migration/*.js')],
  subscribers: [path.join(__dirname, './subscriber/*.js')],
  migrationsRun: true,
};

const ormConfig = {
  production: {
    ...ormConfigBase,
    logging: false,
    synchronize: false,
  },
  development: {
    ...ormConfigBase,
    entities: [path.join(__dirname, './entity/**/*.entity.ts')],
    migrations: [path.join(__dirname, './migration/*.ts')],
    subscribers: [path.join(__dirname, './subscriber/*.ts')],
    logging: false,
    synchronize: false,
  },
  staging: {},
};

const config: any = ormConfig[process.env.NODE_ENV];

const AppDataSource = new DataSource(config);

export default AppDataSource;
