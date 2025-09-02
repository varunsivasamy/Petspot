import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const products = [
  // your products list as before
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h2 className="mb-4">Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: 'cover', maxHeight: '400px', width: '100%' }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <h1 className="mb-3">{product.name}</h1>
            <p className="text-secondary mb-4">{product.description}</p>
            <h3 className="text-primary mb-4">${product.price.toFixed(2)}</h3>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}