require('dotenv').config()
const express = require('express');
const {sequelize, User} = require('./models');
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
    console.log(`Server started on ${port} port!`);
    await sequelize.sync({force: true});
    await initial();
    console.log(`Database synced!`);
  });
  exitHook(async callback => {
    await sequelize.close();
    console.log('Sequelize disconnected');
    callback();
  });
}


const initial = async () => {
  await User.create({
    email: "admin@admin.com",
    displayName: "John",
    password: "1qaz@WSX29"
  });
};

run().catch(console.error);

