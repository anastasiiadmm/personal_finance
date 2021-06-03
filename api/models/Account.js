module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Group',
                key: 'id'
            }
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferences: {
            type: DataTypes.ENUM,
            values: ['KGS', 'USD', 'EURO'],
        },
        accountAvatar: {
            type: DataTypes.STRING,
        },
        tableName: 'accounts',
        modelName: 'Account',
        sequelize
    });

    return Account;
};
