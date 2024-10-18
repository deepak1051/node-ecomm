import express from 'express';
import usersRepo from './repositories/users.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    
    <form  method="POST" action="/">
      <input placeholder="Email" name="email"/>
      <input placeholder="Password" name="password"/>
      <input placeholder="Password Confirmation" name="passwordConfirm"/>

      <button>Sign Up</button>
    </form>

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

  res.send('Thanks for signing up!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
