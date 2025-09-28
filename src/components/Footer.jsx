import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-5 border-top">
      <div className="container text-muted small">
        &copy; {new Date().getFullYear()} PetShop. All rights reserved.
      </div>
    </footer>
  );
}