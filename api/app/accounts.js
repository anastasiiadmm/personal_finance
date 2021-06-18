const express = require('express');
const auth = require("../middleware/auth");
const {Account} = require('../models');
const upload = require('../multer').accountIcon;


const router = express.Router();

router.get('/groups/:id', async (req, res) => {
  try {
      console.log(req.params.id);
      const accounts = await Account.findAll({where: {groupId: req.params.id}});
    res.status(200).send(accounts);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }

});

router.post('/:id',auth ,upload.single('accountIcon'), async (req, res) => {

    const accountData = req.body;
    accountData.user = req.user.id;
    try {
        const account = await Account.create({
            accountName: req.body.accountName,
            userId: accountData.user,
            groupId: req.params.id,
            balance: req.body.balance,
            preferences: req.body.preferences,
            accountIcon: req.file ? req.file.filename : null,
        });


        console.log(account);
        res.status(200).send(account);
    } catch (e) {
        return res.status(400).send({message: e.message});
    }


});

router.put('/:id', auth, upload.single('accountIcon'), async (req, res) => {

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

router.delete('/:id', auth, async (req, res) => {


    try {
        const account = await Account.findOne({where: {id: req.params.id}});
        console.log(req.params.id);
        account.destroy();
        res.send("Account deleted!");
    } catch (e) {
        res.status(400).send({message: e.message})
    }

});


module.exports = router;
