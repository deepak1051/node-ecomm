import express from 'express';
import newProductTemplate from '../../views/admin/products/new.js';

import validators from './validators.js';
import { validationResult } from 'express-validator';

const router = express.Router();

const { requireTitle, requirePrice } = validators;

router.get('/admin/products', (req, res) => {
  res.send('Admin Products');
});

router.get('/admin/products/new', (req, res) => {
  res.send(newProductTemplate({}));
});

router.post('/admin/products/new', [requireTitle, requirePrice], (req, res) => {
  const errors = validationResult(req);

  req.on('data', (data) => {
    console.log(data.toString());
  });

  console.log(req.body);

  res.send('OK');
});

export default router;
