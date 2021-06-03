const express = require('express');
const {Group, User, GroupUsers, UsersGroups} = require('../models');
const upload = require('../multer').group;

const router = express.Router();

router.post('/', upload.single('group'), async (req, res) => {
    try {
        const group = await Group.create({
            nameGroup: req.body.nameGroup,
        });

        await GroupUsers.create({
            role: 'owner',
            userId: req.body.userId,
            groupId: group.id
        });

        res.status(200).send(group.toJSON());

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.post('/addUsersGroup', async (req, res) => {
    try {
        const group = await GroupUsers.create({
            userId: req.body.userId,
            groupId: req.body.groupId,
            role: req.body.role
        });

        // const user = await User.findOne({email: req.body.email});
        //
        // if (user) {
        //     await UsersGroups.create({
        //         role: req.body.role,
        //         userId: req.body.userId,
        //         groupId: group.id
        //     });
        // }
        //
        // if (!user) {
        //     res.send({message: 'Email not found!'});
        // }

        res.status(200).send("ok");
    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const groups = await Group.findAll({include: [{model: User, as: 'users'}]});

        res.status(200).send(groups);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.put('/:id', async (req, res) => {
    try {

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

module.exports = router;