module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );

  Cart.associate = db => {
    Cart.belongsTo(
      db.User,
      {
        foreignKey: "userId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    ),
      Cart.belongsTo(
        db.Product,
        {
          foreignKey: "productId",
          allowNull: false,
        },
        {
          onDelete: "RESTRICT",
        }
      );
  };

  return Cart;
};
