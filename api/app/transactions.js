const express = require('express');
const {Op} = require('sequelize');
const upload = require('../multer').cashierCheck;
const auth = require("../middleware/auth");
const {Transaction} = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const criteria = {};

    if (req.query.category) {
      criteria.id = req.query.category;
    }

    const transactions = await Transaction.findAll({include: {association: 'category', attributes: ['id', 'name'], where: criteria}});

    res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/transfer', upload.single('cashierCheck'), auth, async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.id,
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

router.post('/expenditure', upload.single('cashierCheck'), auth, async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.id,
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

router.post('/income', upload.single('cashierCheck'), auth, async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.id,
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
    const transaction = await Transaction.findOne({
        where: {id: req.params.id},
        include: {
          association: 'user',
          where: {id: req.body.userId},
          include: {
            association: 'groups',
            through: {
              attributes: ['userId'],
              where: {userId: req.body.userId}
            },
            include: [{
              association: 'users',
              attributes: ['displayName', 'id'],
              where: {id: req.body.userId},
              through: {
                attributes: ['role'],
                where: {
                  [Op.or]: [
                    {role: 'admin'},
                    {role: 'owner'}
                  ]
                }
              }
            }]
          }
        },
      }
    );

    if (!transaction) {
      return res.status(404).send({message: "No permission"});
    }

    await Transaction.update({
        categoryId: req.body.categoryId,
        sumIn: req.body.sumIn,
        sumOut: req.body.sumOut,
        description: req.body.description,
      },
      {where: {id: req.params.id}});


    if (req.file) {
      await transaction.update({
        cashierCheck: req.file.filename
      })
    }

    res.status(200).send('Success');
  } catch (e) {
    res.status(400).send({message: e.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
        where: {id: req.params.id},
        include: {
          association: 'user',
          where: {id: req.body.userId},
          include: {
            association: 'groups',
            through: {
              attributes: ['userId'],
              where: {userId: req.body.userId}
            },
            include: [{
              association: 'users',
              attributes: ['displayName', 'id'],
              where: {id: req.body.userId},
              through: {
                attributes: ['role'],
                where: {
                  [Op.or]: [
                    {role: 'admin'},
                    {role: 'owner'}
                  ]
                }
              }
            }]
          }
        },
      }
    );

    if (!transaction) {
      return res.status(404).send({message: "No permission"});
    }

    await transaction.destroy({where: {id: req.params.id}});

    res.status(200).send('Successfully deleted!');
  } catch (e) {
    res.status(400).send('Not deleted!')
  }
});

module.exports = router;
