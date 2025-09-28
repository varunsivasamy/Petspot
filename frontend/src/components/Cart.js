import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalAmount, loading } = useContext(CartContext);
  const user = getCurrentUser();

  // Calculate subtotal per item
  const itemSubtotal = (item) => item.price * item.qty;

  if (!user) {
    return (
      <div className="cart-container">
        <div className="cart-items">
          <h2 className="cart-title">Your Cart</h2>
          <p>Please <Link to="/login">login</Link> to view your cart.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-items">
          <h2 className="cart-title">Your Cart</h2>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      
      {/* Left: Cart Items */}
      <div className="cart-items">
        <h2 className="cart-title">Your Cart</h2>
        {cart.length === 0 && (
          <p>Cart empty — <Link to="/products" className="continue-shopping">shop now</Link></p>
        )}
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
            </div>
            <div className="cart-item-actions">
              <input 
                type="number" 
                value={item.qty} 
                min={1} 
                onChange={e => updateQty(item.productId, Number(e.target.value))} 
              />
              <p>Subtotal: ₹{itemSubtotal(item)}</p>
              <button onClick={() => removeFromCart(item.productId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="summary-row">
            <span>Taxes (5%)</span>
            <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(totalAmount * 1.05).toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
          <Link to="/products" className="continue-shopping">Continue Shopping</Link>
        </div>
      )}
    </div>
  );
}
