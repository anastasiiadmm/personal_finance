module.exports = (sequelize, DataTypes) => {
    const GroupUsers = sequelize.define('GroupUsers', {
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
            defaultValue: 'owner'
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

        tableName: 'groupUsers',
        modelName: 'GroupUsers',
        sequelize,
    });

    return GroupUsers;
};