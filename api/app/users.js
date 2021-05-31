const express = require('express');
const {User} = require('../models');
const config = require('../config');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifySignUp = require("../middleware/verifySignUp");
const upload = require('../multer').avatar;


const router = express.Router();

router.post('/signup/', upload.single('avatar'), verifySignUp.checkDuplicateEmail, async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.file ? req.file.filename : null
    });

    user.setToken();

    const userData = user.toJSON();
    delete userData.password;
    res.status(200).send({userData});

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

    const userData = user.toJSON();
    delete userData.password;

    res.status(200).send({
      ...userData,
    });
  } catch (e) {
    return res.status(400).send({message: e.message});
  }
});


module.exports = router;