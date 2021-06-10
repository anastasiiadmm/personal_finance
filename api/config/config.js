const path = require('path');
const rootPath = path.join(__dirname, '../');
require('dotenv').config()

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  tokenDuration: 180 * 60 * 1000,
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    }
  },
  secret: process.env.TOKEN_SECRET
};



