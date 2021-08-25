const path = require('path');
const rootPath = path.join(__dirname, '../');
require('dotenv').config();

const env = process.env.NODE_ENV;

let databaseUrl = process.env.DB_NAME;
let port = 8000;
let domain = 'http://localhost:'

if (env === 'test') {
  databaseUrl = process.env.DB_TEST_NAME;
  port = 8010;
} else if (env === 'production') {
  domain = '178.62.206.204:8000';
}

module.exports = {
  URL: domain + port+'/',
  port,
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  tokenDurationDays: 7,
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: databaseUrl,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: databaseUrl,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: databaseUrl,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    }
  },
};
