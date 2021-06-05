'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: Sequelize.INTEGER,
      accountOut: Sequelize.INTEGER,
      accountIn: Sequelize.INTEGER,
      sumOut: Sequelize.INTEGER,
      sumIn: Sequelize.INTEGER,
      categoryId: Sequelize.INTEGER,
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