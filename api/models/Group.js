
const modelsUser = models.user;

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
        Group.belongsToMany(modelsUser.User, {
            through: 'GroupUsers',
            as: 'users',
            foreignKey: 'userId'
        });
    }

    return Group;
};