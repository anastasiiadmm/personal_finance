const express = require('express');
const upload = require('../multer').cashierCheck;
const {Account, Category, User, Group, Transaction} = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Tr' + req.body);
    const transactions = await Transaction.findAll({
      include: [
        {model: User, as: 'user'},
        {model: Account},
        {model: Category, as: 'category'}
      ]
    });

    console.log('Tr' + req.body);

    res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/transfer', async (req, res) => {
  console.log(req.body);
  try {
    const transactionData = {
      userId: req.body.userId,
      accountOut: req.body.accountOut,
      accountIn: req.body.accountIn,
      sumOut: req.body.sumOut,
      sumIn: req.body.sumIn,
      categoryId: req.body.categoryId,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null
    }

    const transaction = await Transaction.create(transactionData);
    res.status(200).send(transaction.toJSON());
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/expense', upload.single('cashierCheck'), async (req, res) => {
  try {
    const transactionData = {
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    };

    if (req.body.accountOut) {
      transactionData.accountOut = req.body.accountOut;
      transactionData.sumOut = req.body.sumOut;
      transactionData.accountIn = null;
      transactionData.sumIn = null;
    }

    const transaction = await Transaction.create(transactionData);
    res.status(200).send(transaction.toJSON());
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/income', upload.single('cashierCheck'), async (req, res) => {
  try {
    const transactionData = {
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    };

    if (req.body.accountIn) {
      transactionData.accountIn = req.body.accountIn;
      transactionData.sumIn = req.body.sumIn;
      transactionData.accountOut = null;
      transactionData.sumOut = null;
    }

    const transaction = await Transaction.create(transactionData);
    res.status(200).send(transaction.toJSON());
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.put('/:id', upload.single('cashierCheck'), async (req, res) => {
  try {

  } catch (e) {

  }
});

module.exports = router;
