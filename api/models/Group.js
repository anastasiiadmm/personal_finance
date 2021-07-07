module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING
    },
  }, {
    tableName: 'group',
    modelName: 'Group',
    sequelize,
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: models.GroupUsers,
      as: 'users',
      foreignKey: 'groupId'
    });
    Group.hasMany(models.Account, {
      as: "accounts",
      foreignKey: 'groupId'
    });
  };


  return Group;
};