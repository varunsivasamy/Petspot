const express = require('express');
const Order = require('../models/order');
const CartItem = require('../models/cart');
const router = express.Router();

// Save order after checkout
router.post('/create', async (req, res) => {
  try {
    const { userData, cart, totalAmount, paymentId, userId } = req.body;
    
    // Create the order
    const order = new Order({ userData, cart, totalAmount, paymentId });
    await order.save();
    
    // Clear user's cart after successful order
    if (userId) {
      await CartItem.deleteMany({ userId });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Could not save order' });
  }
});

// Get user's orders
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ 'userData.userId': userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

module.exports = router;
