const express = require('express');
const {Transaction} = require('../models');
const upload = require('../multer').cashierCheck;
const Account = null;
const Category = null;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({include: [{model: Account, required: true}, {model: Category, required: true}]});

    res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/expense', upload.single('cashierCheck'), async (req, res) => {
  try {
    const transaction = await Transaction.create({
      userId: req.body.userId,
      accountOut: req.body.accountOut,
      accountIn: null,
      sumOut: req.body.sumOut,
      sumIn: null,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    });

    res.status(200).send(transaction.toJSON());
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/income', upload.single('cashierCheck'), async (req, res) => {
  try {
    const transaction = await Transaction.create({
      userId: req.body.userId,
      accountOut: null,
      accountIn: req.body.accountIn,
      sumOut: null,
      sumIn: req.body.sumIn,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    });

    res.status(200).send(transaction.toJSON());
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

module.exports = router;
