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
      foreignKey: {
        name: 'categoryId',
        as: 'categoryId',
        allowNull: false,
      }
    });

    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        as: 'userId',
        allowNull: false,
      }
    });

    Transaction.belongsTo(models.Account);
  };

  return Transaction;
};
