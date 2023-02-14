const express = require("express");

const cartController = require("../controllers/cart-controller");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/createCart", authenticate, cartController.createCart);

router.get("/getCart", authenticate, cartController.getCart);

router.delete("/:cartId", authenticate, cartController.deleteCart);

module.exports = router;
