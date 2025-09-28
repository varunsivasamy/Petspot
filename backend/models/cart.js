const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: String,
  price: Number,
  qty: { type: Number, default: 1 },
  image: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
