import express, { Router, Request, Response } from 'express';
import { wrap } from '@global/middlewares/wraps.middle';

// router instance
const router: Router = express.Router();

/**
 * Get user
 */
router.get(
  '/',
  [],
  wrap(async (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'Request Successful',
    });
  }),
);

export default router;
