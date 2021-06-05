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
  console.log(req.body)
  try {
    const transactionData = {
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    };

    if (req.body.accountOut) {
      transactionData.accountOut =  req.body.accountOut;
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
  console.log(req.body)
  try {
    const transactionData = {
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    };

    if (req.body.accountIn) {
      transactionData.accountIn =  req.body.accountIn;
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




module.exports = router;
