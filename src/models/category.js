module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Category.associate = db => {
    Category.hasMany(
      db.Product,
      {
        foreignKey: "categoryId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    );
  };

  return Category;
};
