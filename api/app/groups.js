const express = require('express');
const auth = require("../middleware/auth");
const {Group, GroupUsers, User} = require('../models');
const {Op} = require("sequelize");
const upload = require('../multer').group;

const router = express.Router();

router.post('/', auth, upload.single('avatarGroup'), async (req, res) => {
    try {
        const group = await Group.create({
            nameGroup: req.body.nameGroup,
            avatarGroup: req.file ? req.file.filename : null,
        });

        await GroupUsers.create({
            role: 'owner',
            userId: req.user.id,
            groupId: group.id
        });

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.post('/:id', auth, async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
                association: 'users',
                attributes: ['displayName', 'id', 'email'],
                where: {id: req.user.id},
                through: {
                    attributes: ['role'],
                    where: {
                        [Op.or]: [
                            {role: 'admin'},
                            {role: 'owner'}
                        ]
                    }
                },
            }],
        });

        if (!group) {
            return res.status(404).send({message: "No permission"});
        }

        const user = await User.findOne({email: req.body.email});

        if (user) {
            await group.addUser(user.id, {through: {role: 'user'}});
        }

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const groups = await Group.findAll({
            include: [{
                association: 'users',
                attributes: ['id'],
                where: {id: req.user.id}
            }]
        });

        return res.status(200).send(groups);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
                association: 'users',
                attributes: ['displayName', 'id', 'avatar', 'email'],
                through: {
                    attributes: ['role']
                }
            }]
        });

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.put('/:id', auth, upload.single('avatarGroup'), async (req, res) => {
    try {
        console.log(req.body)
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
                association: 'users',
                attributes: ['displayName', 'id', 'email'],
                where: {id: req.user.id},
                through: {
                    attributes: ['role'],
                    where: {
                        [Op.or]: [
                            {role: 'admin'},
                            {role: 'owner'}
                        ]
                    }
                },
            }],
        });

        if (!group) {
            return res.status(404).send({message: "No permission"});
        }

        if (req.body.editUserId) {
            const groupUsers = await GroupUsers.findOne({
                where: {userId: req.body.editUserId, groupId: group.id}
            });

            if (!groupUsers) {
                return res.status(404).send({message: "Wrong user"});
            }
            if (req.body.role === 'owner') {
                return res.status(404).send({message: "Owner is present"});
            }
            if (groupUsers.role === "owner") {
                return res.status(404).send({message: "Can not edit owner's role"});
            }
            groupUsers.role = req.body.role;
            groupUsers.save();
        }

        if (req.body.nameGroup) {
            group.nameGroup = req.body.nameGroup
            if (req.file) {
                group.avatarGroup = req.file.filename;
            }
            group.save();
        }

        return res.status(200).send(group);
    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.delete('/:id/:editUserId', auth, async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
                association: 'users',
                attributes: ['displayName', 'id'],
                where: {id: req.user.id},
                through: {
                    attributes: ['role'],
                    where: {
                        [Op.or]: [
                            {role: 'admin'},
                            {role: 'owner'}
                        ]
                    }
                },
            }],
        });

        if (!group) {
            return res.status(404).send({message: "No permission"});
        }

        const groupUsers = await GroupUsers.findOne({
            where: {userId: req.params.editUserId, groupId: group.id}
        });
        if (!groupUsers) {
            return res.status(404).send({message: "Wrong user"});
        }
        if (groupUsers.role === "owner") {
            return res.status(404).send({message: "Can not edit owner's role"});
        }

        group.removeUser(req.params.editUserId);

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.delete('/:id/delete', auth, async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
                association: 'users',
                attributes: ['displayName', 'id'],
                where: {id: req.user.id},
                through: {
                    attributes: ['role'],
                    where: {
                        [Op.or]: [
                            {role: 'owner'}
                        ]
                    }
                },
            }],
        });

        if (!group) {
            return res.status(404).send({message: "No permission"});
        }

        if (group.nameGroup === 'Personal') {
            return res.status(404).send({message: "No permission"});
        }

        group.destroy();

        return res.status(200).send(group);
    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

module.exports = router;