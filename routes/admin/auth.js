import express from 'express';
import { check, validationResult } from 'express-validator';
import usersRepo from '../../repositories/users.js';
import { signupTemplate } from '../../views/admin/auth/signup.js';
import { signinTemplate } from '../../views/admin/auth/signin.js';
import validators from './validators.js';

const { requireEmail, requirePassword, requirePasswordConfirmation } =
  validators;

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors: errors }));
    }

    console.log(errors);

    const { email, password, passwordConfirm } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id; //added by cookie session
    res.send('Thanks for signing up!');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You have been signed out!');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [validators.requireEmailExists, validators.requireValidPasswordForUser],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }));
    }

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id; //added by cookie session
    res.send('You are signed in!');
  }
);

export default router;
