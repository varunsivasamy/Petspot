const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID ,   // Replace with your test key
  key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET  // Replace with your test secret
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount,        // amount in paise (frontend already multiplied by 100)
      currency: currency,    // INR
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
