const express = require("express");

const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/getProduct/:productId", productController.getProducts);
router.get("/getAllProduct", productController.getAllProducts);
router.get("/matchProduct/:productId", productController.matchProduct);

module.exports = router;
