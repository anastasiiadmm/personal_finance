module.exports = (sequelize, DataTypes) => {
  const AccountTransactions = sequelize.define('AccountTransactions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    transactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Transaction',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AccountTransactions',
    tableName:'accountTransactions'
  });

  return AccountTransactions;
};
