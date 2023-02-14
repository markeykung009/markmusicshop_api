const { Product, Category } = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findAll({
      where: { categoryId: productId },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: { model: Category },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.matchProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({
      where: { id: productId },
      include: { model: Category },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};
