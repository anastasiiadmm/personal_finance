'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('account', [{
      userId: 1,
      groupId: 1,
      accountName: "Cash",
      balance: 200,
      accountIcon: 'accountIcon/XbqRRsYTkMHz0ZJ9iyfCE.JPG',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      groupId: 1,
      accountName: "Visa",
      balance: 0,
      accountIcon: 'accountIcon/XbqRRsYTkMHz0ZJ9iyfCE.JPG',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      groupId: 2,
      balance: 1000,
      accountName: "Cash",
      accountIcon: 'accountIcon/XbqRRsYTkMHz0ZJ9iyfCE.JPG',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      groupId: 2,
      balance: 0,
      accountIcon: 'accountIcon/XbqRRsYTkMHz0ZJ9iyfCE.JPG',
      accountName: "Visa",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('account', null, {});
  }
};
