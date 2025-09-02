import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="card h-100 text-decoration-none text-dark shadow-sm transition-hover"
      style={{ borderRadius: '0.5rem' }}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text mt-auto fw-bold text-primary">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}