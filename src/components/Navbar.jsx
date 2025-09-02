import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          PetShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active text-warning' : '')
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  'nav-link position-relative' + (isActive ? ' active text-warning' : '')
                }
              >
                Cart
                {totalQuantity > 0 && (
                  <span
                    className="badge bg-warning text-dark rounded-circle position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.75rem', width: '1.3rem', height: '1.3rem' }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active text-warning' : '')
                }
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active text-warning' : '')
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}