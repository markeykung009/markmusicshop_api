const { Cart, Product, Category } = require("../models");
const createError = require("../utils/create-error");

exports.createCart = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(req.user);

    const alreadyHave = await Cart.findOne({
      where: { productId: value.productId },
    });

    console.log(alreadyHave);
    if (alreadyHave) {
      await Cart.update(value, {
        where: { id: alreadyHave.id },
      });
      return res.status(201).json({ msg: "success update your cart" });
    }

    await Cart.create({
      amount: value.amount,
      productId: value.productId,
      userId: req.user.id,
    });
    res.status(201).json({ msg: "success create your cart" });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{ model: Product, include: Category }],
      where: { userId: req.user.id },
    });
    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const value = req.params;
    console.log("kuy", value);
    await Cart.destroy({
      where: { id: value.cartId },
    });

    res.status(204).json({ msg: "ตู้มม หายไปซะ" });
  } catch (err) {
    next(err);
  }
};
