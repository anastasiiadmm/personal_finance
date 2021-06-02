const {User} = require('./user');

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
        tableName: 'groups',
        modelName: 'Group',
    });

    Group.associate = function () {
        Group.belongsToMany(User, {
            through: 'GroupUsers',
            as: 'users',
            foreignKey: 'groupId'
        });
    }

    return Group;
};