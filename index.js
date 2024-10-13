import express from 'express';

const app = express();

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
  req.on('data', (data) => {
    const parsed = data.toString('utf8').split('&');

    const formData = {};

    for (let item of parsed) {
      const [key, value] = item.split('=');
      formData[key] = value;
    }

    console.log(formData);
  });

  //get access to the form data

  res.send('Thanks for signing up!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
