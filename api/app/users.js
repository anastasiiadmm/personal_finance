const express = require('express');
const {User, Group, Token} = require('../models');
const upload = require('../multer').avatar;
const config = require('../config/config');
const {nanoid} = require('nanoid');
const {OAuth2Client} = require('google-auth-library')
const geoip = require('geoip-lite');
const auth = require("../middleware/auth");
const {tryToDeleteFile} = require('../utils');
const {Op} = require("sequelize");


const googleClient = new OAuth2Client(config.google.clientId)
const router = express.Router();

router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {id: req.user.id},
      include: [{
        association: 'groups',
        attributes: ['id'],
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


    await Group.destroy({where: {id: user.groups.map(group => group.id)}})

    user.destroy();

    res.status(200).send('success');
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/signup/', upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      displayName: req.body.displayName ? req.body.displayName : null,
      password: req.body.password ? req.body.password : null,
      avatar: req.file ? config.URL + req.file.filename : null,
    });

    const token = await Token.create({
      userId: user.id,
      token: nanoid(),
      expirationDate: new Date(new Date().getTime() + config.tokenDuration),
      location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
      device: req.headers['user-agent']
    });

    const group = await Group.create({
      title: 'Personal',
    });

    await user.addGroup(group.id, {through: {role: 'owner'}});
    const userData = user.toJSON();
    delete userData.password;
    res.status(200).send({
      ...userData,
      token: {token: token.token, expirationDate: token.expirationDate}
    });
  } catch (e) {
    if (!!req.file) {
      await tryToDeleteFile(req.file.filename, 'avatarImages');
    }
    return res.status(400).send({errors: e.errors});
  }
});

router.post('/sessions/', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {email: req.body.email}, include: {model: Token, as: 'tokens'}
      });

      if (!user) {
        return res.status(404).send({message: "Invalid email or password"});
      }

      if (!await user.validPassword(req.body.password)) {
        return res.status(401).send({
          message: "Invalid email or password"
        });
      }

      const newToken = {
        userId: user.id,
        token: nanoid(),
        expirationDate: new Date(new Date().getTime() + config.tokenDuration),
        location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
        device: req.headers['user-agent']
      };

      let token;

      const existingToken = (user.tokens.find((token) => token.device === newToken.device && token.location === newToken.location));
      if (!existingToken) {
        token = await Token.create(newToken);
      } else {
        token = await Token.findOne({where: {id: existingToken.toJSON().id}});
        await token.update(newToken);
        await token.save();
      }

      const userData = user.toJSON();
      delete userData.password;
      delete userData.tokens;
      res.status(200).send({
        ...userData,
        token: {token: token.token, expirationDate: token.expirationDate}
      });
    } catch
      (e) {
      return res.status(400).send({message: e.message});
    }
  }
);


router.put('/sessions/', upload.single('avatar'), auth, async (req, res) => {
    try {
      const user = await User.findOne({where: {id: req.user.id}});

      if (!!req.file) {
        if (!!user.avatar) {
          await tryToDeleteFile(req.user.avatar.replace(config.URL, ''), 'avatarImages');
        }
        user.avatar = config.URL + req.file.filename;
      }
      req.body.displayName ? user.displayName = req.body.displayName : null;
      req.body.preferences ? user.preferences = req.body.preferences : null;

      if (!!req.body.currentPassword && !!req.body.newPassword) {
        if (!await user.validPassword(req.body.currentPassword)) {
          return res.status(401).send({
            errors: [{message: "Invalid password", path: 'password'}]
          });
        }
        await user.changePassword(req.body.newPassword)
      }

      await user.save();

      const userData = user.toJSON();
      delete userData.password;
      res.status(200).send({
        ...userData,
        token: {token: req.token.token, expirationDate: req.token.expirationDate}
      });
    } catch
      (e) {
      if (!!req.file) {
        await tryToDeleteFile(req.file.filename, 'avatarImages');
      }
      return res.status(400).send({errors: e.errors});
    }
  }
);


router.post('/googleLogin', async (req, res) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.tokenId,
      audience: config.google.clientId
    });


    const {name, email, picture, sub: ticketUserId} = ticket.getPayload();

    if (req.body.googleId !== ticketUserId) {
      return res.status(401).send({global: "User ID incorrect"});
    }

    let user = await User.findOne({
      where: {email: email}, include: {model: Token, as: 'tokens'}
    });

    let token;

    if (!user) {
      user = await User.create({
        email: email,
        password: nanoid(),
        displayName: name,
        avatar: picture.replace('=s96-c', '')
      });

      token = await Token.create({
        userId: user.id,
        token: nanoid(),
        expirationDate: new Date(new Date().getTime() + config.tokenDuration),
        location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
        device: req.headers['user-agent']
      });

      const group = await Group.create({
        title: 'Personal',
      });

      await user.addGroup(group.id, {through: {role: 'owner'}});
    } else {
      const newToken = {
        userId: user.id,
        token: nanoid(),
        expirationDate: new Date(new Date().getTime() + config.tokenDuration),
        location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
        device: req.headers['user-agent']
      };
      const existingToken = (user.tokens.find((token) => token.device === newToken.device && token.location === newToken.location));
      if (!existingToken) {
        token = await Token.create(newToken);
      } else {
        token = await Token.findOne({where: {id: existingToken.toJSON().id}});
        await token.update(newToken);
        await token.save();
      }
    }
    await user.save();
    const userData = user.toJSON();
    delete userData.password;
    delete userData.tokens;
    res.status(200).send({
      ...userData,
      token: {token: token.token, expirationDate: token.expirationDate}
    });

  } catch (e) {
    res.status(500).send({global: 'Server error, please, try again '});
  }
});


router.delete('/sessions/', async (req, res) => {
    try {
      const authToken = req.get('Authorization');
      const success = {message: 'Success'};
      if (!authToken) return res.send(success);
      const token = await Token.findOne({
        where: {
          token: authToken,
          location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
          device: req.headers['user-agent'],
        }, include: {model: User, as: 'user'}
      });
      if (!token) return res.send(success);
      await token.destroy();
      res.send(success);
    } catch
      (e) {
      return res.status(400).send({message: e.message});
    }
  }
);


module.exports = router;