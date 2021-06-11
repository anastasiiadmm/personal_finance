const express = require('express');
const auth = require("../middleware/auth");
const {Group, User, GroupUsers} = require('../models');
const {Op} = require("sequelize");
const upload = require('../multer').group;
const toJson = require('../multer').toJson;

const router = express.Router();

router.post('/', upload.single('avatarGroup'), async (req, res) => {
    try {
        const group = await Group.create({
            nameGroup: req.body.nameGroup,
            avatarGroup: req.file ? req.file.filename : null,
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

router.post('/add', toJson.none(), async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.body.groupId}, include: [{
                association: 'users',
                attributes: ['displayName', 'id', 'email'],
                where: {id: req.body.userId},
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

        await group.addUser(req.body.newUserId, {through: {role: 'user'}});

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const groups = await Group.findAll({include: [{model: User, as: 'users'}]});

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
                attributes: ['displayName', 'id', 'avatar'],
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

router.put('/:id', upload.single('avatarGroup'), async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
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
            groupUsers.save()
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

router.delete('/:id', toJson.none(), async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id}, include: [{
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
                },
            }],
        });

        if (!group) {
            return res.status(404).send({message: "No permission"});
        }

        const groupUsers = await GroupUsers.findOne({
            where: {userId: req.body.editUserId, groupId: group.id}
        });
        if (!groupUsers) {
            return res.status(404).send({message: "Wrong user"});
        }
        if (groupUsers.role === "owner") {
            return res.status(404).send({message: "Can not edit owner's role"});
        }

        group.removeUser(req.body.editUserId);

        return res.status(200).send(group);

    } catch (e) {
        return res.status(400).send({message: e.message});
    }
});

module.exports = router;