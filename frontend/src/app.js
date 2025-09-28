import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import { CartProvider, CartContext } from './CartContext';
import { getCurrentUser } from './utils';

function AppContent() {
  const [user, setUser] = useState(null);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Listen for storage changes to update user state
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Clear cart when logging out
    window.location.href = '/';
  };

  return (
    <>
      {/* Navbar */}
      <header className="site-header">
        <div className="logo">
          <Link to="/">Pet Bazaar</Link>
        </div>
        <nav className="nav-section">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">
              Cart {cart.length > 0 && <span className="cart-count">({cart.length})</span>}
            </Link>
          </div>
          <div className="auth-section">
            {user ? (
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Pet Bazaar</h3>
            <p>Your trusted companion for finding the perfect pet. We connect loving families with amazing animals.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><a href="/products">Dogs</a></li>
              <li><a href="/products">Cats</a></li>
              <li><a href="/products">Birds</a></li>
              <li><a href="/products">Fish</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Email: varunsiva.sm@gmail.com.com</p>
            <p>Phone: +91 9677384016</p>
            <p>Address: pet bazaar,coimbatore</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Pet Bazaar. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
