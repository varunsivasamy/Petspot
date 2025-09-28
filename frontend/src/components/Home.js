import React, { useState, useEffect } from 'react';
import hero1 from '../images/hero1.jpg';
import hero2 from '../images/hero2.jpg';
import hero3 from '../images/hero3.jpg';
import '../styles.css';

const images = [hero1, hero2, hero3];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-carousel">
      <img src={images[current]} alt="carousel" className="carousel-image" />
      <div className="carousel-overlay">
        <h1>Welcome to Pet Bazaar</h1>
        <p>Find your new best friend — dogs, cats, horses and more.</p>
      </div>
    </div>
  );
}
