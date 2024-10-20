import express from 'express';
import usersRepo from '../../repositories/users.js';
import { signupTemplate } from '../../views/admin/auth/signup.js';
import { signinTemplate } from '../../views/admin/auth/signin.js';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post('/signup', async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirm) {
    return res.send('Passwords do not match');
  }

  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id; //added by cookie session
  res.send('Thanks for signing up!');
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You have been signed out!');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email not found');
  }
  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send('Incorrect password');
  }

  req.session.userId = user.id; //added by cookie session
  res.send('You are signed in!');
});

export default router;
