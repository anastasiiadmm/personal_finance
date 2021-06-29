const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please submit valid email'
          }
        }
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Name can not be empty'
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Password can not be empty'
          },
        }
      },
      avatar: DataTypes.STRING,
      preferences: {
        type: DataTypes.ENUM,
        defaultValue: 'KGS',
        values: ['KGS', 'USD', 'EURO'],
      }
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
    User.hasMany(models.Transaction, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    User.hasMany(models.Token, {
      as: 'tokens',
      foreignKey: 'userId'
    });
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  User.prototype.changePassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
  }

  return User;
};
