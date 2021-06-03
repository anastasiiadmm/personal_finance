module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
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
      allowNull: false,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    accountIn: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  return Transaction;
};
