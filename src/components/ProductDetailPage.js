import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage({ isLoggedIn, onAddToCart }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Ambil data detail produk dari API (sesuai dengan URL produk yang diklik)
    axios.get('https://fakestoreapi.com/products/1') // Ganti URL sesuai dengan produk yang diinginkan
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details: ', error);
      });
  }, []);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      // Tambahkan item ke keranjang dengan jumlah yang dipilih
      onAddToCart({ ...product, quantity });
    } else {
      // Redirect ke halaman login jika belum login
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold">{product.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={product.image} alt={product.title} className="w-full h-auto" />
        </div>
        <div>
          <p className="text-gray-600">${product.price}</p>
          <p>{product.description}</p>
          {isLoggedIn ? (
            <div className="mt-4">
              <label htmlFor="quantity" className="block">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white rounded-md p-2 mt-4"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white rounded-md p-2 mt-4"
            >
              Login to Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
