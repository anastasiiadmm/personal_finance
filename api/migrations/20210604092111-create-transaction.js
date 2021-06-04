'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: Sequelize.INTEGER,
      accountOut: Sequelize.INTEGER,
      accountIn: Sequelize.INTEGER,
      sumOut: Sequelize.INTEGER,
      sumIn: Sequelize.INTEGER,
      description: Sequelize.STRING,
      cashierCheck: Sequelize.STRING,
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: true,
        primaryKey: true
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