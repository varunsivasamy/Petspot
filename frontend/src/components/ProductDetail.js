import React, { useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../utils';
import { addToCart } from '../api';
import { CartContext } from '../CartContext';

export default function ProductDetail({ product, onClose }) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart, loadCartFromCloud } = useContext(CartContext);

  // Check if this specific product is in cart when component mounts or cart changes
  useEffect(() => {
    if (product && product._id) {
      const exists = cart.some(item => item.productId === product._id);
      setAdded(exists);
    }
  }, [cart, product]);

  const handleAddToCart = async () => {
    const user = getCurrentUser();
    if (!user) {
      setAdded("login"); // Show login required state
      setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
      return;
    }

    setLoading(true);
    try {
      const response = await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        userId: user.id
      });

      if (response && response.cartItem) {
        // Reload cart to get updated data
        await loadCartFromCloud();
        setAdded("success"); // Show success state
        setTimeout(() => setAdded(true), 1500); // Then show normal added state
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      setAdded("error"); // Show error state
      setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-card" onClick={e => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="category">Category: {product.category}</p>
          <p className="description">{product.description}</p>
          <p className="price">₹{product.price}</p>
          <button 
            onClick={handleAddToCart} 
            className={
              added === "success" ? 'added success' :
              added === "error" ? 'error' :
              added === "login" ? 'login-required' :
              added === true ? 'added' : ''
            }
            disabled={loading}
          >
            {loading ? 'Adding...' : 
             added === "success" ? '✔ Added!' :
             added === "error" ? '✗ Error' :
             added === "login" ? 'Login Required' :
             added === true ? '✔ Added' : 'Add to cart'}
          </button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
