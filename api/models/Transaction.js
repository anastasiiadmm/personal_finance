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
    accountOut: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    accountIn: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
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
    sequelize,
    modelName: 'Transaction',
    tableName:'transaction'
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
      targetKey: 'id',
      foreignKey: 'accountOut',
    });

    Transaction.belongsTo(models.Account, {
      targetKey: 'id',
      foreignKey: 'accountIn',
    });

  };

  return Transaction;
};
