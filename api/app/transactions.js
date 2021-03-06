const express = require('express');
const {Op} = require('sequelize');
const upload = require('../multer').cashierCheck;
const auth = require("../middleware/auth");
const {Transaction, Account} = require('../models');
const {tryToDeleteFile} = require("../utils");

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let criteria;
    let category = null;
    let range = null;

    if (req.query) {
      criteria = JSON.parse(req.query.data);
    }

    if (criteria.category?.id) {
      category = {id: criteria.category.id}
    }
    if (criteria.range) {
      if (criteria.range[0].startDate && criteria.range[0].endDate) {
        range = {
          date: {
            [Op.between]: [criteria.range[0].startDate, criteria.range[0].endDate]
          }
        }
      }
    }

    const transactions = await Transaction.findAndCountAll({
      where: range,
      limit: criteria.limit,
      offset: criteria.offset,
      order: [['date', 'DESC']],
      include: [
        {
          association: 'category',
          attributes: ['id', 'name', 'icon'],
          where: category,
        },
        {
          association: 'group', required: true,
          include: {
            association: 'users',
            required: true,
            where: {id: req.user.id},
            attributes: ['displayName', 'id'],
            through: {
              attributes: ['role', 'userId'],
            },
          },
        },
        {association: 'user', attributes: ['id', 'displayName', 'avatar']},
        {association: 'accountFrom', attributes: ['id', 'accountName'],},
        {association: 'accountTo', attributes: ['id', 'accountName']}
      ]
    });
    res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.get('/transactionType', auth, async (req, res) => {
  try {
    let criteria;
    let type = null;
    let range = null;

    if (req.query) {
      criteria = JSON.parse(req.query.data);
    }

    if (criteria.categoryType) {
      type = {type: criteria.categoryType}
    }

    if (criteria.range[0].startDate && criteria.range[0].endDate) {
      range = {
        date: {
          [Op.between]: [criteria.range[0].startDate, criteria.range[0].endDate]
        }
      }
    }

    const transactions = await Transaction.findAll({
      where: {
        [Op.and]: [{
          type: {
            [Op.ne]: 'Transfer'
          }
        }, type, range]
      },
      include: [{
        association: 'category',
        attributes: ['id', 'name', 'icon']
      }, {
        association: 'user',
        attributes: ['id', 'displayName', 'avatar'],
        where: {id: req.user.id}
      }, {
        association: 'accountFrom',
        attributes: ['id', 'accountName']
      }, {
        association: 'accountTo',
        attributes: ['id', 'accountName']
      }]
    });

    res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.put('/', upload.single('cashierCheck'), auth, async (req, res) => {
    try {
      const transaction = await Transaction.findOne({where: {id: req.body.id}});

      if (!!req.file) {
        if (!!transaction.cashierCheck) {
          await tryToDeleteFile(transaction.cashierCheck, 'cashierCheck');
        }
        transaction.cashierCheck = req.file.filename;
      }

      if (transaction.type === 'Expense' && req.body.sumOut) {
        const account = await Account.findOne({where: {id: transaction.accountFromId}});
        account.balance = parseInt(account.balance) + parseInt(transaction.sumOut) - parseInt(req.body.sumOut);
        account.save();
      }
      if (transaction.type === 'Income' && req.body.sumIn) {
        const account = await Account.findOne({where: {id: transaction.accountToId}});
        account.balance = parseInt(account.balance) - parseInt(transaction.sumIn) - parseInt(req.body.sumIn);
        account.save();
      }
      if (transaction.type === 'Transfer' && req.body.sumIn) {
        const accountFrom = await Account.findOne({where: {id: transaction.accountFromId}});
        accountFrom.balance = parseInt(accountFrom.balance) + parseInt(transaction.sumIn) - parseInt(req.body.sumIn);
        accountFrom.save();
        const accountTo = await Account.findOne({where: {id: transaction.accountToId}});
        accountTo.balance = parseInt(accountTo.balance) - parseInt(transaction.sumIn) + parseInt(req.body.sumIn);
        accountTo.save();
      }

      Object.keys(req.body).forEach((key) => {
        transaction[key] = req.body[key];
      });


      await transaction.save();
      res.status(200).send('Edited transaction');
    } catch
      (e) {
      if (!!req.file) {
        await tryToDeleteFile(req.file.filename, 'cashierCheck');
      }
      return res.status(400).send({errors: e.errors});
    }
  }
);

router.post('/transfer', upload.single('cashierCheck'), auth, async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.id,
      accountToId: req.body.accountToId,
      accountFromId: req.body.accountFromId,
      sumOut: req.body.sumOut,
      groupId: req.body.groupId,
      sumIn: req.body.sumIn,
      date: req.body.date,
      type: 'Transfer',
      categoryId: req.body.categoryId,
      description: req.body.description ? req.body.description : null,
      cashierCheck: req.file ? req.file.filename : null
    };
    const accountFrom = await Account.findOne({where: {id: req.body.accountFromId}});
    accountFrom.balance = parseInt(accountFrom.balance) - parseInt(req.body.sumIn);
    const accountTo = await Account.findOne({where: {id: req.body.accountToId}});
    accountTo.balance = parseInt(accountTo.balance) + parseInt(req.body.sumIn);
    await accountTo.save();
    await accountFrom.save();

    const transaction = await Transaction.create(transactionData);
    res.status(200).send(transaction.toJSON());
  } catch (e) {
    if (!!req.file) {
      await tryToDeleteFile(req.file.filename, 'cashierCheck');
    }
    return res.status(400).send({message: e.message});
  }
});

router.post('/expenditure', upload.single('cashierCheck'), auth, async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.id,
      date: req.body.date,
      groupId: req.body.groupId,
      type: 'Expense',
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

    const account = await Account.findOne({where: {id: req.body.accountFromId}});
    account.balance = parseInt(account.balance) - parseInt(req.body.sumOut);
    account.save();

    const transaction = await Transaction.create(transactionData);
    res.status(200).send(transaction.toJSON());
  } catch (e) {
    if (!!req.file) {
      await tryToDeleteFile(req.file.filename, 'cashierCheck');
    }
    return res.status(400).send({message: e.message});
  }
});

router.post('/income', upload.single('cashierCheck'), auth, async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.id,
      categoryId: req.body.categoryId,
      date: req.body.date,
      groupId: req.body.groupId,
      type: 'Income',
      description: req.body.description,
      cashierCheck: req.file ? req.file.filename : null,
    };

    if (req.body.accountToId) {
      transactionData.accountToId = req.body.accountToId;
      transactionData.sumIn = req.body.sumIn;
      transactionData.accountFromId = null;
      transactionData.sumOut = null;
    }
    const account = await Account.findOne({where: {id: req.body.accountToId}});
    account.balance = parseInt(account.balance) + parseInt(req.body.sumIn);
    account.save();

    const transaction = await Transaction.create(transactionData);
    res.status(200).send(transaction.toJSON());
  } catch (e) {
    if (!!req.file) {
      await tryToDeleteFile(req.file.filename, 'cashierCheck');
    }
    return res.status(400).send({message: e.message});
  }
});

router.delete('/:id', auth, async (req, res) => {
    try {
      const transaction = await Transaction.findOne({
          where: {
            [Op.and]: [{id: JSON.parse(req.params.id)}]
          }
        }
      );

      if (transaction) {
        await tryToDeleteFile(transaction.cashierCheck, 'cashierCheck');
        const accountTo = await Account.findOne({where: {id: transaction.accountToId}});
        const accountFrom = await Account.findOne({where: {id: transaction.accountFromId}});
        if (accountFrom) {
          accountFrom.balance = parseInt(accountFrom.balance) + parseInt(transaction.sumOut);
          accountFrom.save();
        }
        if (accountTo) {
          accountTo.balance = parseInt(accountTo.balance) - parseInt(transaction.sumIn);
          accountTo.save();
        }
        transaction.destroy();
      } else {
        return res.status(404).send({message: "No permission"});
      }
      res.status(200).send('Deleted successfully');
    } catch
      (e) {
      res.status(400).send('Not deleted!')
    }
  }
)
;

module.exports = router;
