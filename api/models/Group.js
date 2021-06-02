module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    nameGroup: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatarGroup: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'group',
    modelName: 'Group',
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'GroupUsers',
      as: 'users',
      foreignKey: 'groupId'
    });
  };

  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'GroupUsers',
      as: 'users',
      foreignKey: 'groupId'
    });
  };

  return Group;
};