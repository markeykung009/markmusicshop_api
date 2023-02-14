module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      profileImage: DataTypes.STRING,
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      underscored: true,
    }
  );

  User.associate = db => {
    User.hasMany(
      db.Order,
      {
        foreignKey: "userId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    );
    User.hasMany(
      db.Cart,
      {
        foreignKey: "userId",
        allowNull: false,
      },
      {
        onDelete: "RESTRICT",
      }
    );
  };

  return User;
};
