import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import dog from "../assets/dogfood.jpg"
import cat from "../assets/catscratchpost.jpg"
import bird from "../assets/birdcage.webp"
import gold from "../assets/golden.webp"
import per from "../assets/images.jpg"
import par from "../assets/par.jpg"
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Dog Food',
    price: 29.99,
    image: dog,
  },
  {
    id: 2,
    name: 'Cat Scratching Post',
    price: 45.0,
    image: cat,
  },
  {
    id: 3,
    name: 'Bird Cage Deluxe',
    price: 119.99,
    image: bird,
  },
  {
    id: 4,
    name: 'golden retriever',
    price: 100,
    image: gold,
  },
  {
    id: 5,
    name: 'Persian Cat',
    price: 70.0,
    image: per,
  },
  {
    id: 6,
    name: 'Parrot',
    price: 119.99,
    image: par,
  },
];

export default function Home() {
  return (
    <div className="container py-5">
      <section className="mb-5 text-center">
        <h1 className="display-4 fw-bold mb-3">Welcome to PetShop</h1>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px' }}>
          Your one-stop online store for all your pet needs. Quality products for dogs, cats,
          birds, and more.
        </p>
      </section>

      <section>
        <h2 className="h3 fw-semibold mb-4">Featured Products</h2>
        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div className="col-12 col-sm-6 col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}