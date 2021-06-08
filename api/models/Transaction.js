module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    accountFromId: DataTypes.INTEGER,
    accountToId: DataTypes.INTEGER,
    sumOut: {
      type: DataTypes.INTEGER,
    },
    sumIn: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    description: DataTypes.STRING,
    cashierCheck: DataTypes.STRING
  }, {
    modelName: 'Transaction',
    tableName: 'transaction',
    sequelize
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Category, {
      targetKey: 'id',
      foreignKey: 'categoryId',
      as: 'category',
      allowNull: false,
    });

    Transaction.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      as: 'user',
      allowNull: false,
    });

    Transaction.belongsTo(models.Account, {
      as: 'AccountFrom'
    });

    Transaction.belongsTo(models.Account, {
      as: 'AccountTo'
    });

  };

  return Transaction;
};
