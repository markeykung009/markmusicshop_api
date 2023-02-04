require("dotenv").config();
// const { sequelize } = require("./models");
const express = require("express");
const authRoute = require("./routes/auth-route");

const app = express();

// sequelize.sync({ force: true });

app.use(express.json());

app.use("/auth", authRoute);

app.use((req, res, next) => {
  res.status(404).json({ msg: "resource is not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log({ msg: `server is running on port: ${port}` })
);
