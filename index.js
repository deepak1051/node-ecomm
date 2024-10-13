import express from 'express';

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

app.post('/', (req, res) => {
  const body = req.body;

  console.log(body);

  res.send('Thanks for signing up!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
