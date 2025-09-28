// cart.js
const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart');

// Add to cart
router.post("/add", async (req, res) => {
  const { productId, name, price, image, userId } = req.body;

  if (!userId) return res.status(400).json({ message: "userId required" });
  if (!productId) return res.status(400).json({ message: "productId required" });

  try {
    // Ensure productId is treated as string for consistent comparison
    const productIdStr = productId.toString();
    
    // Check if item already exists in cart for this specific user and product
    const existingItem = await CartItem.findOne({ 
      productId: productIdStr, 
      userId: userId 
    });

    if (existingItem) {
      // Increase quantity if exact same item already exists
      existingItem.qty += 1;
      await existingItem.save();
      res.json({ message: "Item quantity updated", cartItem: existingItem });
    } else {
      // Create new cart item for this product
      const cartItem = new CartItem({ 
        productId: productIdStr, 
        name, 
        price, 
        image, 
        userId 
      });
      await cartItem.save();
      res.json({ message: "Item added to cart", cartItem });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's cart items
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await CartItem.find({ userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update cart item quantity
router.put("/update", async (req, res) => {
  try {
    const { productId, userId, qty } = req.body;

    if (qty <= 0) {
      // Remove item if quantity is 0 or less
      await CartItem.deleteOne({ productId, userId });
      res.json({ message: "Item removed from cart" });
    } else {
      // Update quantity
      const cartItem = await CartItem.findOneAndUpdate(
        { productId, userId },
        { qty },
        { new: true }
      );
      res.json({ message: "Quantity updated", cartItem });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.delete("/remove", async (req, res) => {
  try {
    const { productId, userId } = req.body;
    await CartItem.deleteOne({ productId, userId });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear entire cart
router.delete("/clear/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await CartItem.deleteMany({ userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Debug route - get all cart items (for debugging)
router.get("/debug/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await CartItem.find({ userId });
    res.json({ 
      count: cartItems.length, 
      items: cartItems.map(item => ({
        id: item._id,
        productId: item.productId,
        name: item.name,
        qty: item.qty
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
