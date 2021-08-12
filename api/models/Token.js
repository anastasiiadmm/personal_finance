const {nanoid} = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      device: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      hooks: {
        beforeCreate: (token) => {
          token.token = nanoid();
        }
      },
      tableName: 'token',
      modelName: 'Token',
      sequelize,
    }
  );

  Token.associate = (models) => {
    Token.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  };
  return Token;
};
