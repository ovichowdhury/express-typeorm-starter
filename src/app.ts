import express, { Request, Response } from 'express';
import configureExpress from '@config/express.config';

const app: express.Application = express();

/**
 * Express configuration
 */
configureExpress(app);

/**
 * Registering Modules
 */
// configureRoutes(app);

/**
 * Health of API
 */
app.get('/_health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

/**
 * Error Handling Middleware
 */
// app.use(errorHandler);

export default app;
