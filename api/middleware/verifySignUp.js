const {User} = require('../models');


checkDuplicateEmail = (req, res, next) => {
  if(!req.body.email){
    res.status(400).send({
      message: "No email"
    });
    return;
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }
    next();
  });
};
const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;