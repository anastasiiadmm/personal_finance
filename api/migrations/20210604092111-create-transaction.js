'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: Sequelize.INTEGER,
      accountOut: Sequelize.INTEGER,
      accountIn: Sequelize.INTEGER,
      sumOut: Sequelize.INTEGER,
      sumIn: Sequelize.INTEGER,
      description: Sequelize.STRING,
      cashierCheck: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};