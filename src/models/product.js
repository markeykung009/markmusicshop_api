module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Product.associate = db => {
    Product.hasMany(
      db.OrderItem,
      {
        foreignKey: "productId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    ),
      Product.belongsTo(
        db.Supplier,
        {
          foreignKey: "supplierId",
          allowNull: false,
        },
        {
          onDelete: "RESTRICT",
        }
      ),
      Product.belongsTo(
        db.Category,
        {
          foreignKey: "categoryId",
          allowNull: false,
        },
        {
          onDelete: "RESTRICT",
        }
      );
  };

  return Product;
};
