'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('category', [{
      userId: 1,
      name: "Salary",
      categoryType: 'income',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      name: "Groceries",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      name: "Salary",
      categoryType: 'income',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      name: "Groceries",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      name: "Transfer",
      categoryType: 'income',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('category', null, {});

  }
};
