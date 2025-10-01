import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './container_presenter_pattern/messy-way/components/CartContext';
import ProductsPage from './container_presenter_pattern/messy-way/components/productPage';
import CartPage from './container_presenter_pattern/messy-way/components/cartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
