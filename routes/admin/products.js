import express from 'express';
import { validationResult } from 'express-validator';
import multer from 'multer';

import newProductTemplate from '../../views/admin/products/new.js';
import validators from './validators.js';
import productsRepo from '../../repositories/products.js';
const { requireTitle, requirePrice } = validators;

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/admin/products', (req, res) => {
  res.send('Admin Products');
});

router.get('/admin/products/new', (req, res) => {
  res.send(newProductTemplate({}));
});

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(newProductTemplate({ errors }));
    }

    const image = req.file.buffer.toString('base64');

    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.send('OK');
  }
);

export default router;
