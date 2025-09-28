import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import { createOrder, saveOrder } from '../api';
import { getCurrentUser } from '../utils';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const user = getCurrentUser();

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setUserData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!userData.name || !userData.email || !userData.phone || !userData.address) {
      alert('Please fill in all details before proceeding.');
      return;
    }

    try {
      setLoading(true);
      const finalAmount = totalAmount * 1.05; // Including 5% tax
      const order = await createOrder({ amount: finalAmount * 100, currency: 'INR' });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxx',
        amount: order.amount,
        currency: order.currency,
        name: 'Pet Bazaar',
        description: 'Purchase of pets',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Save order to database
            const orderData = {
              userData: {
                userId: user.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address
              },
              cart: cart.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                qty: item.qty,
                image: item.image
              })),
              totalAmount: finalAmount,
              paymentId: response.razorpay_payment_id,
              userId: user.id
            };

            await saveOrder(orderData);
            
            alert(
              `Payment successful!\nPayment ID: ${response.razorpay_payment_id}\nThank you, ${userData.name}!`
            );
            
            // Clear cart after successful order
            await clearCart();
          } catch (err) {
            console.error('Failed to save order:', err);
            alert('Payment successful but failed to save order details');
          }
        },
        prefill: { 
          name: userData.name, 
          email: userData.email, 
          contact: userData.phone 
        },
        notes: { address: userData.address },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment failed to initiate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.Razorpay) {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(s);
    }
  }, []);

  if (!user) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Please <Link to="/login">login</Link> to proceed with checkout.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your cart is empty. <Link to="/products">Continue shopping</Link></p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* User Details Form */}
      <div className="checkout-form">
        <h3>Shipping Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={userData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Complete Shipping Address"
          value={userData.address}
          onChange={handleChange}
          required
        />
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div key={item._id} className="summary-row">
            <span>{item.name} x {item.qty}</span>
            <span>₹{(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Taxes (5%)</span>
          <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>₹{(totalAmount * 1.05).toFixed(2)}</span>
        </div>
        <button 
          className="checkout-btn" 
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay with Razorpay'}
        </button>
      </div>
    </div>
  );
}
