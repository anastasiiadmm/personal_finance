const express = require('express');
const {Account, User} = require('../models');
const upload = require('../multer').avatar;


const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const accounts = await Account.findAll({include: [{model: User, as: 'users'}]});
        res.status(200).send(accounts);
    } catch (e) {
        return res.status(400).send({message: e.message});
    }

});

router.post('/', upload.single('avatar'), async (req, res) => {

    try {
        const account = await Account.create({
            accountName: req.body.accountName,
            userId: req.body.userId,
            groupId: req.body.groupId,
            count: req.body.count,
            preferences: req.body.preferences,
            accountAvatar: req.file ? req.file.filename : null,
        });
        console.log(account);


        res.status(200).send(account.toJSON());
    } catch (e) {
        return res.status(400).send({message: e.message});
    }


});

router.put('/:id', upload.single('avatar'), async (req, res) => {
    // const accountData = req.body;
    // accountData.user = req.body.user.id;
    // if (accountData.user === req.body.user.id) {
        try {
            const account = await Account.create({
                accountName: req.body.accountName,
                count: req.body.count,
                accountAvatar: req.file ? req.file.filename : null
            });


            res.status(200).send(account.toJSON());
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    // } else {
    //     res.status(401).send('Please Login!')
    // }
});

router.delete('/:id', async (req, res) => {
    // const accountData = req.body;
    // accountData.user = req.user.id;
    // if (accountData.user === req.body.user.id) {
        try {
            await Account.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.send("Account deleted!");
        } catch (e) {
            res.status(400).send('Not deleted!')
        }
    // } else {
    //     res.status(401).send('Please Login!')
    // }
});


module.exports = router;
