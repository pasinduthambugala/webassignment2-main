const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
      },
      title: { type: String, required: true },
      quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
      image: { type: String, required: true },
      price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
      totalPrice: { type: Number, required: true, min: [0, 'Total price cannot be negative'] },
      available: { type: Boolean, default: true }, // snapshot of availability at order time
    },
  ],
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
    min: [0, 'Items price cannot be negative'],
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
