import CustomError from '@global/errors/custom.error';
import { Request, Response, NextFunction } from 'express';

const statusMsg = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Authentication Error';
    case 404:
      return 'Not Found';
    case 500:
      return 'Internal Server Error';
    default:
      return 'Internal Server Error';
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(err: Error | CustomError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: statusMsg(err.statusCode),
      errors: err.serializeErrors(),
    });
  }

  return res.status(500).json({
    message: statusMsg(500),
    errors: [{ message: err.toString() }],
  });
}

// for handling uncaught exception from application
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('uncaughtException', (err: any) => {
  // eslint-disable-next-line no-console
  console.error('[ERROR] Uncaught Exception : ', err.message);
  process.exit(1);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (err: any) => {
  // eslint-disable-next-line no-console
  console.error('[ERROR] Unhandled Rejection: ', err.message);
  process.exit(1);
});
