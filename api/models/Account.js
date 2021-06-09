module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,

    },
    preferences: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'KGS',
      values: ['KGS', 'USD', 'EURO'],
    },
    accountIcon: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'account',
    modelName: 'Account',
    sequelize
  });

  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId'
    });
    Account.belongsTo(models.Group, {
      targetKey: 'id',
      foreignKey: 'groupId'
    });
  }

  return Account;
};
