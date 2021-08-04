const express = require('express');
const {Op} = require('sequelize');
const auth = require("../middleware/auth");
const {Account, Group, Transaction} = require('../models');
const upload = require('../multer').accountIcon;


const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.findAll({
      include: {
        model: Group,
        include: [{
          association: 'users',
          attributes: ['displayName', 'id'],
          where: {id: req.user.id},
        }],
      }
    });
    res.status(200).send(accounts);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const accounts = await Account.findAll({where: {groupId: req.params.id}});
    res.status(200).send(accounts);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }

});


router.post('/:id', auth, upload.single('accountIcon'), async (req, res) => {

  const accountData = req.body;
  accountData.user = req.user.id;

  try {
    const account = await Account.create({
      accountName: req.body.accountName,
      userId: accountData.user,
      groupId: req.params.id,
      balance: req.body.balance,
      currency: req.body.currency,
      accountIcon: req.file ? req.file.filename : null,
    });

    res.status(200).send(account);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }


});

router.put('/:id', upload.single('accountIcon'), async (req, res) => {

  try {
    await Account.update({
        accountName: req.body.accountName,
        accountIcon: req.file ? req.file.filename : null,
      },
      {where: {id: req.params.id}});

    res.status(200).send("Изменен");
  } catch (e) {
    return res.status(400).send({message: e.message});
  }

});

router.delete('/:id', auth, async (req, res) => {
  try {

    const account = await Account.findOne({where: {id: req.params.id}});
    await Transaction.destroy({
      where: {
        [Op.or]:
          {accountToId: req.params.id, accountFromId: req.params.id}
      }
    });

    account.destroy();
    res.send("Accounts deleted!");
    console.log(account + 'delete');

  } catch (e) {
    res.status(400).send({message: e.message});
    console.log(e + 'error');
  }

});


module.exports = router;
