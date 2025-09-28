import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const allProducts = [  
];

const categories = ['All', 'Dog', 'Cat', 'Bird'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Products</h1>

      <form className="mb-4 d-flex align-items-center gap-3 flex-wrap">
        <label htmlFor="category" className="form-label mb-0 fw-semibold">
          Filter by Category:
        </label>
        <select
          id="category"
          className="form-select w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </form>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-12 col-sm-6 col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}