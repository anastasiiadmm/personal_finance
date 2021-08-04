const express = require('express');
const auth = require("../middleware/auth");
const {Group, GroupUsers, User} = require('../models');
const {Op} = require("sequelize");
const upload = require('../multer').group;

const router = express.Router();

router.post('/', auth, upload.single('avatar'), async (req, res) => {
  try {
    const group = await Group.create({
      title: req.body.title,
      avatar: req.file ? req.file.filename : null,
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

    const user = await User.findOne({where: {email: req.body.email}});

    if (user.id === req.user.id) {
      return res.status(404).send({message: "Incorrect Email!"});
    }

    if (user) {
      await group.addUser(user.id, {through: {role: 'user'}});
    }

    if (!user) {
      return res.status(404).send({message: "Email not found"});
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
      }, {association: 'accounts'}]
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

router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
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

    if (req.body.title) {
      group.title = req.body.title
      if (req.file) {
        group.avatar = req.file.filename;
      }
      group.save();
    }

    return res.status(200).send(group);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.delete('/:id/:editUserId/deleted', auth, async (req, res) => {
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
    console.log('user', req)
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

    if (group.title === 'Personal') {
      return res.status(404).send({message: "No permission"});
    }

    group.destroy();

    return res.status(200).send(group);
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

module.exports = router;