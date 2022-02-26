import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import appConfig from './app.config';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

export default function configureExpress(app: Application) {
  // trusting to be behind a proxy server
  app.set('trust proxy', true);
  // security headers set
  app.use(helmet());
  // json body parse
  app.use(express.json());

  /**
   * CORS configuration
   */
  app.use(
    cors({
      origin: appConfig.corsOrigin.split(','),
      methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 200,
    }),
  );

  // enabling logging of HTTP request using morgan
  // create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' });
  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }));
}
