module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );

  OrderItem.associate = db => {
    OrderItem.belongsTo(
      db.Order,
      {
        foreignKey: "orderId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    ),
      OrderItem.belongsTo(
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

  return OrderItem;
};
