const path = require('path');
const verifySignUp = require("./middleware/verifySignUp");
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('./config/config');
const {tryToCreateDir} = require("./utils");

const createMulter = (dirName, field) => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      await tryToCreateDir(dirName);
      cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
      const filename = nanoid() + path.extname(file.originalname);
      const filepath = path.join(dirName, filename);
      cb(null, filepath);
    }
  });
  return multer({
    storage: storage,
    fileFilter: async (req, file, cb) => {
      cb(null, await verifySignUp.checkBeforeUpload(req.body, field));
    }
  });
};


const avatar = createMulter('avatar', 'email');
const group = createMulter('group');
const cashierCheck = createMulter('cashierCheck');
const categoryIcon = createMulter('categoryIcon');
const accountIcon = createMulter('accountIcon');

module.exports = {
  avatar,
  group,
  cashierCheck,
  categoryIcon,
  accountIcon
};