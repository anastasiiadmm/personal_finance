const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.JSON,
      },
      avatar: DataTypes.STRING,
      preferences: {
        type: DataTypes.ENUM,
        values: ['KGS', 'USD', 'EURO'],
      },
    }, {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      sequelize,
      tableName: 'user',
      modelName: 'User',
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'GroupUsers',
      as: 'groups',
      foreignKey: 'userId'
    });
  };

  return User;
};
