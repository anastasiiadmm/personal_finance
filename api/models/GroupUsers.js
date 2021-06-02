module.exports = (sequelize, DataTypes) => {
  return sequelize.define('GroupUsers', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['owner', 'admin', 'user'],
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'groupUsers',
    modelName: 'GroupUsers',
  });
};