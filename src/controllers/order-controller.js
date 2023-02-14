const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const { User, Order, OrderItem, Cart, Product } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const value = {
      totalPrice: req.body.totalPrice,
      transactionImg: req.file?.path,
      status: req.body.status,
      address: req.body.address,
    };

    console.log(value.transactionImg);

    if (value.transactionImg) {
      value.transactionImg = await cloudinary.upload(value.transactionImg);
    }

    value.userId = req.user.id;

    const paid = await Order.create(value);

    const getCart = await Cart.findAll({
      include: { model: Product },
      where: { userId: req.user.id },
    });

    const data = getCart.map(el => ({
      amount: el.amount,
      productId: el.productId,
      orderId: paid.id,
      price: el.Product.price,
    }));

    await OrderItem.bulkCreate(data);

    await Cart.destroy({
      where: { userId: req.user.id },
    });

    res.status(201).json({ paid });
  } catch (err) {
    next(err);
  } finally {
    fs.unlinkSync(req.file?.path);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      include: { model: OrderItem },
    });

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const value = req.body;
    // const result = await Order.findOne({
    //   where: { id: value.id },
    // });

    // console.log(req.body.status);

    // result.status = req.body.status;

    console.log("jojo", value);

    await Order.update(
      { status: req.body.status },
      {
        where: { id: value.id },
      }
    );
    res.status(201).json({ msg: "success update status" });
  } catch (err) {
    next(err);
  }
};
