module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: DataTypes.INTEGER,
    accountOut: DataTypes.INTEGER,
    accountIn: DataTypes.INTEGER,
    sumOut: DataTypes.INTEGER,
    sumIn: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    cashierCheck: DataTypes.STRING,
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName:'transaction'
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        as: 'category',
        allowNull: false,
      }
    });

    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        as: 'user',
        allowNull: false,
      }
    });

    Transaction.belongsTo(models.Account, {
      foreignKey: {
        name: 'accountId',
        as: 'account',
        allowNull: false,
      }
    });
  };

  return Transaction;
};
