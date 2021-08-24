
'use strict';


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('category', [{
      id: 1,
      userId: 1,
      name: "Salary",
      categoryType: 'income',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      userId: 1,
      name: "Groceries",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      userId: 2,
      name: "Salary",
      categoryType: 'income',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      userId: 2,
      name: "Groceries",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 40,
      userId: 1,
      name: "Transfer",
      categoryType: 'transfer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 41,
      userId: 2,
      name: "Transfer",
      categoryType: 'transfer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 5,
      userId: 1,
      name: "Housing",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 42,
      userId: 2,
      name: "Housing",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 6,
      userId: 2,
      sub: true,
      parentCategory: 42,
      name: "Mortgage or rent",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 7,
      userId: 1,
      sub: true,
      parentCategory: 5,
      name: "Mortgage or rent",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 8,
      userId: 1,
      name: "Transportation",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 9,
      userId: 2,
      name: "Transportation",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 10,
      userId: 1,
      sub: true,
      parentCategory: 8,
      name: "Repairs",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 11,
      userId: 2,
      sub: true,
      parentCategory: 9,
      name: "Repairs",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 12,
      userId: 1,
      sub: true,
      parentCategory: 8,
      name: "Taxi",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 13,
      userId: 2,
      sub: true,
      parentCategory: 9,
      name: "Taxi",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 14,
      userId: 1,
      sub: true,
      parentCategory: 8,
      name: "Public transport",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 15,
      userId: 2,
      sub: true,
      parentCategory: 9,
      name: "Taxi",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 43,
      userId: 1,
      name: "Utilities",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 44,
      userId: 2,
      name: "Utilities",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 16,
      userId: 1,
      name: "Clothing",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 17,
      userId: 2,
      name: "Clothing",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 18,
      userId: 1,
      name: "Medical/Healthcare",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 19,
      userId: 2,
      name: "Medical/Healthcare",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 20,
      userId: 1,
      name: "Personal",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 21,
      userId: 2,
      name: "Personal",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 22,
      userId: 1,
      name: "Debt",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 23,
      userId: 2,
      name: "Debt",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 24,
      userId: 1,
      name: "Retirement",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 25,
      userId: 2,
      name: "Retirement",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 26,
      userId: 1,
      name: "Education",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 27,
      userId: 2,
      name: "Education",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 28,
      userId: 1,
      name: "Gifts/Donations",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 29,
      userId: 2,
      name: "Gifts/Donations",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 30,
      userId: 1,
      name: "Entertainment",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 31,
      userId: 2,
      name: "Entertainment",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 32,
      userId: 1,
      sub: true,
      parentCategory: 30,
      name: "Alcohol and/or bars",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 33,
      userId: 2,
      sub: true,
      parentCategory: 31,
      name: "Alcohol and/or bars",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 34,
      userId: 1,
      sub: true,
      parentCategory: 30,
      name: "Games",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 35,
      userId: 2,
      sub: true,
      parentCategory: 31,
      name: "Games",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 36,
      userId: 1,
      sub: true,
      parentCategory: 30,
      name: "Movies",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 37,
      userId: 2,
      sub: true,
      parentCategory: 31,
      name: "Movies",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 38,
      userId: 1,
      sub: true,
      parentCategory: 30,
      name: "Subscriptions (Netflix, Amazon, Hulu, etc.)",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 39,
      userId: 2,
      sub: true,
      parentCategory: 31,
      name: "Subscriptions (Netflix, Amazon, Hulu, etc.)",
      categoryType: 'expenditure',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);

  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('category', null, {});

  }
};