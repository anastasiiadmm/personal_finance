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

    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    const userData = user.toJSON();
    delete userData.password;
    res.status(200).send({
      ...userData,
      accessToken: token
    });

  } catch (e) {
    return res.status(400).send({message: err.message});
  }
});

router.post('/login/', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "User Not found."});
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      const userData = user.toJSON();
      delete userData.password;

      res.status(200).send({
        ...userData,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
});


module.exports = router;