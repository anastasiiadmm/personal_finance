const express = require('express');
const upload = require('../multer').cashierCheck;
const {Account, Category, User, Group, Transaction} = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();

    res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/transfer', upload.single('cashierCheck'), async (req, res) => {
  try {
    const transactionData = {
      userId: req.body.userId,
      accountToId: req.body.accountToId,
      accountFromId: req.body.accountFromId,
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

    if (req.body.accountFromId) {
      transactionData.accountFromId = req.body.accountFromId;
      transactionData.sumOut = req.body.sumOut;
      transactionData.accountToId = null;
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

    if (req.body.accountToId) {
      transactionData.accountToId = req.body.accountToId;
      transactionData.sumIn = req.body.sumIn;
      transactionData.accountFromId = null;
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
    await Transaction.update(
      {
        categoryId: req.body.categoryId,
        sumOut: req.body.sumOut ? req.body.sumOut : null,
        sumIn: req.body.sumIn ? req.body.sumIn : null,
        description: req.body.description,
        cashierCheck: req.body.cashierCheck
      },
      {where: {id: req.params.id}}
    );

    res.status(200).send('Successfully updated!');
  } catch (e) {
    res.status(400).send('Not updated!')
  }
});

router.delete('/:id', async (req, res) => {

});

module.exports = router;
