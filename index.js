import express from 'express';
import cookieSession from 'cookie-session';
import usersRepo from './repositories/users.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['lightyagamigokuishigamikagami'],
  })
);

app.get('/', (req, res) => {
  res.send(`
    <div>
    Your ID is ${req.session.userId}
    <form  method="POST" action="/">
      <input placeholder="Email" name="email"/>
      <input placeholder="Password" name="password"/>
      <input placeholder="Password Confirmation" name="passwordConfirm"/>

      <button>Sign Up</button>
    </form>
<div>
  `);
});

app.post('/', async (req, res) => {
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
