'use strict';
const {nanoid} = require('nanoid');
const config = require("../config/config");


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('token', [{
      userId: 1,
      device: "desktop",
      token: nanoid(),
      expirationDate: new Date(new Date().setDate(new Date().getDate() + config.tokenDurationDays)),
      location: "KG",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      token: nanoid(),
      device: "desktop",
      expirationDate: new Date(new Date().setDate(new Date().getDate() + config.tokenDurationDays)),
      location: "KG",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('token', null, {});
  }
};
