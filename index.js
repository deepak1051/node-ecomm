import express from 'express';
import cookieSession from 'cookie-session';

import authRoutes from './routes/admin/auth.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['lightyagamigokuishigamikagami'],
  })
);

app.use(authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
