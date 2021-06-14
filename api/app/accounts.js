const express = require('express');
const auth = require("../middleware/auth");
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

router.post('/', auth, upload.single('accountIcon'), async (req, res) => {

    const accountData = req.body;
    accountData.user = req.user.id;
    accountData.group = req.group.id
    console.log(accountData);
    try {

        const account = await Account.create({

            accountName: accountData.accountName,
            userId: accountData.user,
            groupId: accountData.group,
            balance: accountData.balance,
            preferences: accountData.preferences,
            accountIcon: req.file ? req.file.filename : null,
        });
        //   include: {
        //     association: 'user',
        //         where: {id: req.body.userId},
        //     include: {
        //       association: 'groups',
        //           through: {
        //         attributes: ['userId'],
        //             where: {userId: req.body.userId}
        //       },
        //       include: [{
        //         association: 'users',
        //         attributes: ['displayName', 'id'],
        //         where: {id: req.body.userId},
        //         through: {
        //           attributes: ['role'],
        //           where: {
        //             [Op.or]: [
        //               {role: 'admin'},
        //               {role: 'owner'}
        //             ]
        //           }
        //         }
        //       }]
        //     }
        //   },
        // }
        console.log(account);
        res.status(200).send(account.toJSON());
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
