require("dotenv").config();
// const { sequelize } = require("./models");
const express = require("express");
const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const cartRoute = require("./routes/cart-route");
const orderRoute = require("./routes/order-route");
const cors = require("cors");

const app = express();

// sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use((req, res, next) => {
  res.status(404).json({ msg: "resource is not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log({ msg: `server is running on port: ${port}` })
);
