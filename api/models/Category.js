module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    icon: DataTypes.STRING,
    categoryType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['income', 'expenditure', 'transfer']
    },
  }, {
    sequelize,
    tableName: 'category',
    modelName: 'Category',
  });

  /////////////////////RELATIONSHIPS

  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: {
        name: 'userId'
      },
      as: 'user'
    });

    Category.hasMany(Category, {
      foreignKey: {
        name: 'parentCategory',
      },
      as: 'subCategory'
    });

    Category.hasMany(models.Transaction, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      as: 'transactions'
    });
  };

  return Category;
}