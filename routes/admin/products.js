import express from 'express';

const router = express.Router();

router.get('/admin/products', (req, res) => {
  res.send('Admin Products');
});

router.get('/admin/products/new', (req, res) => {
  res.send('New Product');
});

export default router;
