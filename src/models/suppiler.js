module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      supplierName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Supplier.associate = db => {
    Supplier.hasMany(
      db.Product,
      {
        foreignKey: "supplierId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    );
  };

  return Supplier;
};
