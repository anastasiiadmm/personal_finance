module.exports = (sequelize, DataTypes) => {
  const GroupUsers = sequelize.define('GroupUsers', {
    userId: {
      type: DataTypes.INTEGER,
      integer: 'not null',
      references: {
        model: 'User',
        key: 'id'
      },
      hooks: true,
      allowNull: false,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    role: {
      type: DataTypes.ENUM,
      values: ['owner', 'admin', 'user'],
      defaultValue: 'owner'
    },
    groupId: {
      type: DataTypes.INTEGER,
      integer: 'not null',
      references: {
        model: 'Group',
        key: 'id'
      },
      hooks: true,
      allowNull: false,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }
  }, {
    tableName: 'groupUsers',
    modelName: 'GroupUsers',
    sequelize,
  });

  return GroupUsers;
};