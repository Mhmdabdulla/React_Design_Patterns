/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const products = [
//   {
//     id: 1,
//     name: 'Wireless Headphones',
//     price: 2999,
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
//     description: 'Premium noise-cancelling wireless headphones',
//     discount: 20,
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     price: 4999,
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
//     description: 'Fitness tracker with heart rate monitor',
//     discount: 15,
//   },
//   {
//     id: 3,
//     name: 'Laptop Backpack',
//     price: 1499,
//     image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
//     description: 'Durable water-resistant backpack',
//     discount: 10,
//   },
//   {
//     id: 4,
//     name: 'USB-C Cable',
//     price: 299,
//     image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500',
//     description: 'Fast charging USB-C cable',
//     discount: 5,
//   },
//   {
//     id: 5,
//     name: 'Mechanical Keyboard',
//     price: 3499,
//     image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
//     description: 'RGB mechanical gaming keyboard',
//     discount: 25,
//   },
//   {
//     id: 6,
//     name: 'Wireless Mouse',
//     price: 899,
//     image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
//     description: 'Ergonomic wireless mouse',
//     discount: 12,
//   },
// ];

const ProductsPage = () => {
  const { addToCart, getTotalItems } = useCart();
  const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)

    useEffect(() => {
    // ✅ Correct: Create async function inside useEffect
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/products');
        console.log(response.data);
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
    

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-blue-600">Tech</span>Store
          </h1>
          <Link
            to="/cart"
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-semibold">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our latest collection of tech products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {product.discount}% OFF
                  </div>
                )} */}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                    {/* {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{Math.round(product.price / (1 - product.discount / 100))}
                      </span>
                    )} */}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
