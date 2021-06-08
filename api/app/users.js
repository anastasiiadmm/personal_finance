const express = require('express');
const {User} = require('../models');
const bcrypt = require("bcrypt");
const upload = require('../multer').avatar;
const {nanoid} = require('nanoid');
const geoip = require('geoip-lite');


const router = express.Router();

router.post('/signup/', upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.file ? req.file.filename : null,
      token: [{
        id: nanoid(),
        date: new Date(),
        location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
        device: req.device.type
      }]
    });
    const userData = user.toJSON();
    // delete userData.password;
    res.status(200).send({
      ...userData,
      // token: user.token[0].id
    });

  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    // delete userData.password;
    res.status(200).send(
      users
    );

  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});


router.post('/login/', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(404).send({message: "User Not found."});
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }

    let unExisting = true;
    const token = nanoid();

    user.token.map((device) => {
      if (device.device === req.headers['user-agent']) {
        device.id = token;
        device.date = new Date();
        unExisting = false;
      }
    });

    if (unExisting) {
      user.token.push({id: token, date: new Date(), device: req.headers['user-agent']});
    }
    user.save();
    const userData = user.toJSON();
    delete userData.password;
    delete userData.token;

    res.status(200).send({
      ...userData,
      token: token
    });
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});


module.exports = router;