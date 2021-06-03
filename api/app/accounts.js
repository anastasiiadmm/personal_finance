const express = require('express');
const Account = require('../models/Account');
const upload = require('../multer').avatar;


const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
    const accountData = req.body;
    accountData.user = req.user.id;
    if (accountData.user === req.body.user.id) {
        try {
            const account = await Account.create({
                accountName: req.body.accountName,
                count: req.body.count,
                accountAvatar: req.file ? req.file.filename : null,
            });

            const accountData = account.toJSON();
            res.status(200).send({
                ...accountData
            });
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    } else {
        res.status(401).send('Please Login!')
    }

});

router.put('/:id', upload.single('avatar'), async (req, res) => {
    const accountData = req.body;
    accountData.user = req.user.id;
    if (accountData.user === req.body.user.id) {
        try {
            const account = await Account.create({
                accountName: req.body.accountName,
                count: req.body.count,
                accountAvatar: req.file ? req.file.filename : null
            });

            const accountData = account.toJSON();
            res.status(200).send({
                ...accountData
            });
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    } else {
        res.status(401).send('Please Login!')
    }
});

router.delete('/:id', async (req, res) => {
    const accountData = req.body;
    accountData.user = req.user.id;
    if (accountData.user === req.body.user.id) {
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
    } else {
        res.status(401).send('Please Login!')
    }
});


module.exports = router;
