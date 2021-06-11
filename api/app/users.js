const express = require('express');
const {User, Group, Token} = require('../models');
const upload = require('../multer').avatar;
const config = require('../config/config');
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");
const geoip = require('geoip-lite');


const router = express.Router();

router.post('/signup/', upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.file ? req.file.filename : null,
    });

    const token = await Token.create({
      userId: user.id,
      token: nanoid(),
      expirationDate: new Date(new Date().getTime() + config.tokenDuration),
      location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
      device: req.headers['user-agent']
    });

    const group = await Group.create({
      nameGroup: 'personal',
    });

    await user.addGroup(group.id, {through: {role: 'owner'}});
    const userData = user.toJSON();
    delete userData.password;
    res.status(200).send({
      ...userData,
      token: {token: token.token, expirationDate: token.expirationDate}
    });
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.get('/', auth, async (req, res) => {
  try {
    // const users = await User.findAll({
    //   include: {model: Token, as: 'tokens'}
    // });
    // res.status(200).send(
    //   users
    // );

    res.status(200).send(
      req.user,
    );
  } catch (e) {
    return res.status(400).send({message: e.message});
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