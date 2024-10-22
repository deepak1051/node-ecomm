import { check } from 'express-validator';
import UsersRepo from '../../repositories/users.js';

const validators = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (email) => {
      const existingUser = await UsersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),

  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),

  requirePasswordConfirmation: check('passwordConfirm')
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Passwords do not match');
      }
    }),
};

export default validators;
