const express = require('express');
const {Account, Group} = require('../models');
const upload = require('../multer').accountIcon;


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await Account.findAll({include: {model: Group}});
    res.status(200).send(accounts);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }

});

router.post('/', upload.single('accountIcon'), async (req, res) => {

  try {
    const account = await Account.create({
      accountName: req.body.accountName,
      userId: req.body.userId,
      groupId: req.body.groupId,
      balance: req.body.balance,
      preferences: req.body.preferences,
      accountIcon: req.file ? req.file.filename : null,
    });
    console.log(account);
    res.status(200).send(account.toJSON());
  } catch (e) {
    return res.status(400).send({message: e.message});
  }


});

router.put('/:id', upload.single('accountIcon'), async (req, res) => {

  try {
    await Account.update({
      accountName: req.body.accountName,
      balance: req.body.balance,
      preferences: req.body.preferences,
    },
        {where: {id: req.params.id}});

    res.status(200).send("Изменен");
  } catch (e) {
    return res.status(400).send({message: e.message});
  }

});

router.delete('/:id', async (req, res) => {

  try {
   const account = await Account.findOne({
      where: {
        id: req.body.id
      }
    });
   account.destroy();
    res.send("Account deleted!");
  } catch (e) {
    res.status(400).send('Not deleted!')
  }

});


module.exports = router;
