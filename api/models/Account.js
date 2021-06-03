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
            allowNull: false,
            values: ['KGS', 'USD', 'EURO'],
        },
        accountAvatar: {
            type: DataTypes.STRING,
        },
        tableName: 'account',
        modelName: 'Account',
        sequelize
    });

    // Account.associate = (models) => {
    //     Account.belongsTo(models.User, {
    //         through: models.User,
    //         as: 'users',
    //         foreignKey: 'userId'
    //     })
    // }

    return Account;
};
