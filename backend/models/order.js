const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userData: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    phone: String,
    address: String
  },
  cart: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String
    }
  ],
  totalAmount: Number,
  paymentId: String, // Razorpay Payment ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
