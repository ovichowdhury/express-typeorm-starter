/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();

const ormConfigBase = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./dist/database/entity/**/*.entity.js'],
  migrations: ['./dist/database/migration/*.js'],
  subscribers: ['./dist/database/subscriber/*.js'],
  migrationsRun: true,
  cli: {
    entitiesDir: './src/database/entity/',
    migrationsDir: './src/database/migration/',
    subscribersDir: './src/database/subscriber/',
  },
};

const ormConfig = {
  production: {
    ...ormConfigBase,
    logging: false,
    synchronize: false,
  },
  development: {
    ...ormConfigBase,
    entities: ['./src/database/entity/**/*.entity.ts'],
    migrations: ['./src/database/migration/*.ts'],
    subscribers: ['./src/database/subscriber/*.ts'],
    logging: false,
    synchronize: false,
  },
  staging: {},
};

module.exports = ormConfig[process.env.NODE_ENV];
