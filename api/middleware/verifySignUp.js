const {User} = require('../models');

checkBeforeUpload = async (body, field) => {
  if (field) {
    return !await User.findOne({where: {[field]: body[field]}});
  } else {
    return true;
  }
};

const verifySignUp = {
  checkBeforeUpload: checkBeforeUpload
};

module.exports = verifySignUp;