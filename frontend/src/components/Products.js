import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import { fetchProducts } from '../api'; 

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const shown = products.filter(p => filter === 'all' ? true : p.category === filter);

  return (
    <div>
      <h2>Products</h2>
      <div className="categories">
        {categories.map(c => (
          <button key={c} className={c === filter ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="grid">
        {shown.map(p => (
          <ProductCard 
            key={p._id} 
            product={p} 
            onClick={() => setSelectedProduct(p)} // Open detail modal
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
