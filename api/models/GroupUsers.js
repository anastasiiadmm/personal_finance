const {User} = require('./user');
const {Group} = require('./Group');

module.exports = (sequelize, DataTypes) => {
    const GroupUsers = sequelize.define('GroupUsers', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            }
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Group',
                key: 'groupId'
            }
        }
    });

    GroupUsers.belongsTo(User, {
        as: 'User',
        foreignKey: 'userId'
    });
    GroupUsers.belongsTo(Group, {
        as: 'Group',
        foreignKey: 'groupId'
    });

    return GroupUsers;
}