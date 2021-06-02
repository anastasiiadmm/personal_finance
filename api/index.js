require('dotenv').config()
const express = require('express');
const {sequelize} = require('./models');
const cors = require("cors");
const users = require('./app/users');
const exitHook = require('async-exit-hook');

const app = express();
app.use(express.static('public/uploads'));
app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/users', users);

const run = async () => {
  app.listen(port, async () => {
    try {
      await sequelize.authenticate();
      console.log(`Server started on ${port} port!`);
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

