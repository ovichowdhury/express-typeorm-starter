import express, { Router, Request, Response } from 'express';
import { wrap } from '@global/middlewares/wraps.middle';
import UserService from '@user/services/user.service';
import Container from 'typedi';
import User from '@database/entity/user/user.entity';
import { validates } from '@global/middlewares/express-validation.middle';
import { CreateUserValidations, DeleteUserValidations, UpdateUserValidations } from '@user/validators/user.validator';

// router instance
const router: Router = express.Router();

/**
 * Get user
 */
router.get(
  '/',
  [],
  wrap(async (req: Request, res: Response) => {
    const userService: UserService = Container.get(UserService);
    const users: User[] = await userService.get();
    return res.status(200).json({
      message: 'Request Successful',
      data: users,
    });
  }),
);

/**
 * Create user
 */
router.post(
  '/',
  [validates(CreateUserValidations)],
  wrap(async (req: Request, res: Response) => {
    const userService: UserService = Container.get(UserService);
    const user: User = await userService.create({
      ...req.body,
      createdBy: 'ADMIN',
    });
    return res.status(201).json({
      message: 'Request Successful',
      data: user,
    });
  }),
);

/**
 * Get user
 */
router.put(
  '/:id',
  [validates(UpdateUserValidations)],
  wrap(async (req: Request<{ id: number }>, res: Response) => {
    const userService: UserService = Container.get(UserService);
    const user: User | null = await userService.update(req.params.id, req.body);
    return res.status(200).json({
      message: 'Request Successful',
      data: user,
    });
  }),
);

/**
 * Get user
 */
router.delete(
  '/:id',
  [validates(DeleteUserValidations)],
  wrap(async (req: Request<{ id: number }>, res: Response) => {
    const userService: UserService = Container.get(UserService);
    const id: number = await userService.delete(req.params.id);
    return res.status(200).json({
      message: 'Request Successful',
      data: {
        id: id,
      },
    });
  }),
);

export default router;
