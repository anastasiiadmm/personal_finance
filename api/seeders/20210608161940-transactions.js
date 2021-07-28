'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transaction', [{
      userId: 1,
      categoryId: 1,
      sumIn: 10000,
      accountToId: 1,
      type: 'Income',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      categoryId: 2,
      sumOut: 1000,
      type: 'Expense',
      date: new Date(),
      accountFromId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      categoryId: 5,
      sumIn: 1000,
      sumOut: 1000,
      accountToId: 4,
      type: 'Transfer',
      date: new Date(),
      accountFromId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transaction', null, {});
  }
};
