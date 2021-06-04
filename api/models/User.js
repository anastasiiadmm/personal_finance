const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
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
      tableName: 'user',
      modelName: 'User',
      sequelize,
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: models.GroupUsers,
      as: 'groups',
      foreignKey: 'userId'
    });
    User.hasMany(models.Account, {
      as: "accounts",
      foreignKey: 'userId'
    });
    User.hasMany(models.Category, {
        foreignKey: {
            name: 'userId',
            allowNull: false
        }
    });
  };

  return User;
};
