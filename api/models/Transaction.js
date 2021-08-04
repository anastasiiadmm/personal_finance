module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountFromId: DataTypes.INTEGER,
    accountToId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    sumOut: {
      type: DataTypes.DECIMAL,
    },
    sumIn: {
      type: DataTypes.DECIMAL,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Date can not be empty'
        }
      },
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
    Transaction.belongsTo(models.Group, {
      as: 'group'
    });

    Transaction.belongsTo(models.Account, {
      as: 'accountFrom'
    });

    Transaction.belongsTo(models.Account, {
      as: 'accountTo'
    });

  };

  return Transaction;
};
