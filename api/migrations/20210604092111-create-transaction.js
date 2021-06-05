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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accountOut: {
        type: Sequelize.INTEGER
      },
      accountIn: {
        type: Sequelize.INTEGER
      },
      sumOut: {
        type: Sequelize.INTEGER
      },
      sumIn: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING
      },
      cashierCheck: {
        type: Sequelize.STRING
      },
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