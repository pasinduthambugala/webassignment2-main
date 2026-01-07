const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const Cart = require("../models/cartModel");
const Book = require("../models/bookModel");

exports.addToCart = bigPromise(async (req, res, next) => {
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity) {
        return next(new CustomError("Book ID and quantity are required", 400));
    }

    // fetch book to get current price
    const book = await Book.findById(bookId);
    if (!book) return next(new CustomError('Book not found', 404));
    const itemPrice = book.price || 0;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [{ product: bookId, quantity, price: itemPrice }],
        });
    } else {
        const itemIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === bookId
        );

        if (itemIndex > -1) {
            cart.cartItems[itemIndex].quantity += Number(quantity);
        } else {
            cart.cartItems.push({ product: bookId, quantity, price: itemPrice });
        }
        await cart.save();
    }

    res.status(200).json({
        success: true,
        data: cart,
    });
});

exports.getCart = bigPromise(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product");

    res.status(200).json({
        success: true,
        data: cart ? cart.cartItems : [],
    });
});

exports.removeFromCart = bigPromise(async (req, res, next) => {
    const bookId = req.params.id;

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cart.cartItems.filter(
            (item) => item.product.toString() !== bookId
        );
        await cart.save();
    }

    res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: cart ? cart.cartItems : [],
    });
});