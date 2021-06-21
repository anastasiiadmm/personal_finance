module.exports = (sequelize, DataTypes) => {
    const GroupUsers = sequelize.define('GroupUsers', {
        userId: {
            type: DataTypes.INTEGER,
            integer: 'not null',
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hooks: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['owner', 'admin', 'user'],
            defaultValue: 'owner'
        },
        groupId: {
            type: DataTypes.INTEGER,
            integer: 'not null',
            allowNull: false,
            references: {
                model: 'Group',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            hooks: true
        }
    }, {
        tableName: 'groupUsers',
        modelName: 'GroupUsers',
        sequelize,
    });

    return GroupUsers;
};