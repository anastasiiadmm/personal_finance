require('dotenv').config()
const express = require('express');
const {sequelize} = require('./models');
const cors = require("cors");
const users = require('./app/users');
const groups = require('./app/groups');
const accounts = require('./app/accounts');
const categories = require('./app/categories');
const exitHook = require('async-exit-hook');
const transactions = require('./app/transactions');
const config = require("./config/config");

const app = express();
app.use(express.static('public/uploads'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/groups', groups);
app.use('/transactions', transactions);
app.use('/accounts', accounts);
app.use('/categories', categories);

const run = async () => {
  app.listen(config.port, async () => {
    try {
      await sequelize.authenticate();
      console.log(`Server started on ${config.port} port!`);
    } catch (e) {
      console.log('Server problem: ' + e);
    }
  });

  exitHook(async callback => {
    await sequelize.close();
    console.log('Sequelize disconnected');
    callback();
  });
}

run().catch(console.error);

