import { body, param } from 'express-validator';

export const CreateUserValidations = [
  body('name').isLength({ min: 3, max: 30 }),
  body('email').isEmail(),
  body('mobile').isMobilePhone('bn-BD'),
  body('gender').isIn(['M', 'F', 'T']),
];

export const UpdateUserValidations = [
  param('id').isNumeric().toInt(),
  body('name').isLength({ min: 3, max: 30 }).optional(),
  body('email').isEmail().optional(),
  body('mobile').isMobilePhone('bn-BD').optional(),
  body('gender').isIn(['M', 'F', 'T']).optional(),
];

export const DeleteUserValidations = [param('id').isNumeric().toInt()];
