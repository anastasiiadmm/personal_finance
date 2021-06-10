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
      token: token.token
    });
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.get('/', auth, async (req, res) => {
  try {
    res.status(200).send(
      req.user,
    );
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});

router.post('/login/', async (req, res) => {
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

      const existingToken = (user.tokens.find((token) => token.device === newToken.device && token.location === newToken.location));
      if (!existingToken) {
        await Token.create(newToken);
      } else {
        const token = await Token.findOne({where: {id: existingToken.toJSON().id}});
        token.update(newToken);
        token.save();
      }

      const userData = user.toJSON();
      delete userData.password;
      delete userData.tokens;
      res.status(200).send({
        ...userData,
        token: {token: newToken.token, expirationDate: newToken.expirationDate}
      });
    } catch
      (e) {
      return res.status(400).send({message: e.message});
    }
  }
);


module.exports = router;