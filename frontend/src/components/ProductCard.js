import React, { useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../utils';
import { addToCart } from '../api';
import { CartContext } from '../CartContext';

export default function ProductCard({ product, onClick }) {
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

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // prevent modal open when clicking button
    const user = getCurrentUser();
    
    if (!user) {
      setAdded("login"); // Show login required state
      setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
      return;
    }

    // Check if product has valid ID
    if (!product || !product._id) {
      console.error("Product or product ID is missing:", product);
      setAdded("error");
      setTimeout(() => setAdded(false), 2000);
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

  const getButtonText = () => {
    if (loading) return 'Adding...';
    if (added === "success") return '✔ Added!';
    if (added === "error") return '✗ Error';
    if (added === "login") return 'Login Required';
    if (added === true) return '✔ Added';
    return 'Add to cart';
  };

  const getButtonClass = () => {
    if (added === "success") return 'added success';
    if (added === "error") return 'error';
    if (added === "login") return 'login-required';
    if (added === true) return 'added';
    return '';
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="muted">{product.description}</p>
      <p className="price">₹{product.price}</p>
      <button 
        onClick={handleAddToCart} 
        className={getButtonClass()}
        disabled={loading}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
