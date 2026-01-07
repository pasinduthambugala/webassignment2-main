const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.checkout = bigPromise(async (req, res, next) => {
    const { items, itemsPrice } = req.body;

    if (!items || items.length === 0) {
        return next(new CustomError("No order items", 400));
    }

    const order = new Order({
        orderItems: items,
        user: req.user._id,
        itemsPrice,
        isPaid: true,
        paidAt: Date.now(),
    });

    const createdOrder = await order.save();

    // Optionally clear cart
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
        success: true,
        data: createdOrder,
    });
});

exports.history = bigPromise(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        data: orders,
    });
});