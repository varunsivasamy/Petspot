import React, { createContext, useState, useEffect } from 'react';
import { getCartItems, updateCartItem, removeFromCart as removeCartItem, clearCart as clearUserCart } from './api';
import { getCurrentUser } from './utils';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from cloud when user is logged in
  useEffect(() => {
    loadCartFromCloud();
  }, []);

  // Listen for storage changes (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      loadCartFromCloud();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadCartFromCloud = async () => {
    const user = getCurrentUser();
    if (!user) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);
      const cartItems = await getCartItems(user.id);
      setCart(cartItems || []);
    } catch (err) {
      console.error('Failed to load cart:', err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (productId, qty) => {
    const user = getCurrentUser();
    if (!user) return;

    try {
      if (qty <= 0) {
        await removeCartItem({ productId, userId: user.id });
        setCart(prev => prev.filter(item => item.productId !== productId));
      } else {
        await updateCartItem({ productId, userId: user.id, qty });
        setCart(prev => prev.map(item => 
          item.productId === productId ? { ...item, qty } : item
        ));
      }
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeFromCart = async (productId) => {
    const user = getCurrentUser();
    if (!user) return;

    try {
      await removeCartItem({ productId, userId: user.id });
      setCart(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const clearCart = async () => {
    const user = getCurrentUser();
    if (!user) {
      setCart([]);
      return;
    }

    try {
      await clearUserCart(user.id);
      setCart([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading,
      updateQty, 
      removeFromCart, 
      clearCart, 
      totalAmount,
      loadCartFromCloud
    }}>
      {children}
    </CartContext.Provider>
  );
}
