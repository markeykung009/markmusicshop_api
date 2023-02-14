module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transactionImg: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("reject", "pending", "paid"),
        defaultValue: "pending",
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Order.associate = db => {
    Order.belongsTo(
      db.User,
      {
        foreignKey: "userId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    ),
      Order.hasMany(
        db.OrderItem,
        {
          foreignKey: "orderId",
          allowNull: false,
        },
        {
          onDelete: "RESTRICT",
        }
      );
  };

  return Order;
};
