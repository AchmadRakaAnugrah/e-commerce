import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { setProducts } from '../redux/actions/setProducts';

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    // Ambil data produk dari API ketika komponen dimuat pertama kali
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Tambahkan quantity dan simpan produk ke Redux store
        const productsWithQuantity = data.map((product) => ({ ...product, quantity: 20 }));
        dispatch(setProducts(productsWithQuantity));
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        // Jika produk sudah ada di keranjang, tambahkan jumlahnya
        dispatch(addToCart({ ...product, quantity: existingItem.quantity + 1 }));
      } else {
        // Jika produk belum ada di keranjang, tambahkan dengan quantity 1
        dispatch(addToCart({ ...product, quantity: 1 }));
      }
    } else {
      // Redirect ke halaman login jika belum login
      // Implementasi redirect ke halaman login
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.title} className="w-full h-32 object-contain" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            {isLoggedIn && (
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white rounded-md p-2 mt-4"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
