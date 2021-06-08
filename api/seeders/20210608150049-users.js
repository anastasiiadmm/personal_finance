'use strict';
const {nanoid} = require('nanoid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('user', [{
      email: 'johndoe@test.com',
      displayName: 'John Doe',
      password: '1qaz@WSX29',
      token: JSON.stringify([{
        id: nanoid(),
        date: new Date(),
        location: 'KG',
        device: 'phone'
      }]),
      avatar: 'fixtures/avatar1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        email: 'johnsmith@test.com',
        displayName: 'John Smith',
        password: '1qaz@WSX29',
        token: JSON.stringify([{
          id: nanoid(),
          date: new Date(),
          location: 'KG',
          device: 'phone'
        }]),
        avatar: 'fixtures/avatar2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
