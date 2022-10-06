import express, { Request, Response } from 'express';
import configureExpress from '@config/express.config';
import configureRoutes from '@config/routes.config';
import errorHandler from '@global/middlewares/error-handler.middle';

const app: express.Application = express();

/**
 * Express configuration
 */
configureExpress(app);

/**
 * Registering Modules
 */
configureRoutes(app);

/**
 * Health of API
 */
app.get('/_health', (_: Request, res: Response) => {
  return res.status(200).json({ message: 'OK' });
});

app.use('*', (_: Request, res: Response) => {
  return res.status(404).json({ message: 'API not found' });
});

/**
 * Error Handling Middleware
 */
app.use(errorHandler);

export default app;
