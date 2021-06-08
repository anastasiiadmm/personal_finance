const express = require('express');
const {Group, User, GroupUsers} = require('../models');
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

        return res.status(200).send(group.toJSON());

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.post('/addUsersGroup', async (req, res) => {
    try {
        const groupData = {
            userId: req.body.userId,
            groupId: req.body.groupId,
        };

        if (req.body.role === 'owner') {
            return groupData;
        }

        groupData.role = req.body.role;

        const group = await GroupUsers.create(groupData);

        return res.status(200).send(group.toJSON());

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const groups = await Group.findAll({include: [{model: User, as: 'users'}]});

        return res.status(200).send(groups);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findOne({where: {id: req.params.id}, include: [{model: User, as: 'users'}]});

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.put('/:id', upload.single('group'), async (req, res) => {
    try {
        const groupData = await Group.findOne({where: {id: req.params.id}, include: [{model: User, as: 'users'}]});

        const groupUser = groupData.users.map(res => {
            return res.GroupUsers.role;
        });

        const roleOwner = groupUser.filter(f => f === 'owner');
        const roleAdmin = groupUser.filter(f => f === 'admin');

        if (roleOwner || roleAdmin) {
            const group = await Group.update({
                nameGroup: req.body.nameGroup,
                avatarGroup: req.file ? req.file.filename : null
            }, {
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).send(group);
        } else {
            return res.sendStatus(403).send({message: 'You do not have permission to edit group!'})
        }
    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const group = await Group.findOne({where: {id: req.params.id}, include: [{model: User, as: 'users'}]});

        const groupUser = group.users.map(res => {
            return res.GroupUsers.role;
        });

        const userOwner = groupUser.filter(f => f === 'owner');

        if (userOwner) {
            const group = await Group.destroy({where: {id: req.params.id}});

            return res.status(200).send(group);
        } else {
            return res.status(403).send({message: 'You do not have permission to delete group!'});
        }

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

module.exports = router;