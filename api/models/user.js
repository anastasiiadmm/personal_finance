'use strict';
const {Model} = require('sequelize');
const bcrypt = require("bcrypt");


const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }

  User.init({
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
    avatar: DataTypes.STRING,
    devices: DataTypes.JSON,
    preferences: {
      type: DataTypes.ENUM,
      values: ['KGS', 'USD', 'EURO'],
    },
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
    privateColumns: ['password'],
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });

  return User;
};

