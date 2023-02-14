const express = require("express");

const orderController = require("../controllers/order-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/createOrder",
  authenticate,
  upload.single("transactionImg"),
  orderController.createOrder
);

router.get("/getOrder", orderController.getOrder);
module.exports = router;

router.patch("/updateStatus", orderController.updateStatus);
