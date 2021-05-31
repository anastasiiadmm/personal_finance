'use strict';
const {Model} = require('sequelize');
const bcrypt = require("bcrypt");
const {nanoid} = require('nanoid');


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
        set() {
          const token = {id: nanoid(), date: new Date(), device: null}
          this.setDataValue('token', JSON.stringify([token]));
        }
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
      privateColumns: ['password'],
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );

  return User;
};
