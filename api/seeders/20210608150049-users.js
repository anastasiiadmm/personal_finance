'use strict';
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('user', [{
      email: 'johndoe@test.com',
      displayName: 'John Doe',
      password: await bcrypt.hashSync('1qaz@WSX29', bcrypt.genSaltSync(SALT_WORK_FACTOR)),
      avatar: 'fixtures/avatar1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        email: 'johnsmith@test.com',
        displayName: 'John Smith',
        password: await bcrypt.hashSync('1qaz@WSX29', bcrypt.genSaltSync(SALT_WORK_FACTOR)),
        avatar: 'fixtures/avatar2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
