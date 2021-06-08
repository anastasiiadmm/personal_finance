'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('group', [{
      nameGroup: 'personal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nameGroup: 'personal',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await queryInterface.bulkInsert('groupUsers', [{
      role: 'owner',
      userId: 1,
      groupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'owner',
      userId: 2,
      groupId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('group', null, {});
    await queryInterface.bulkDelete('groupUsers', null, {});
  }
};
