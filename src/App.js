import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Periksa localStorage untuk status login
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    // Mengambil keranjang dari localStorage (jika ada)
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  // Fungsi untuk menambah item ke keranjang
  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      const updatedCart = [...cartItems];
      const existingItem = updatedCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Jika produk sudah ada di keranjang, tambahkan jumlahnya
        existingItem.quantity += 1;
      } else {
        // Jika produk belum ada di keranjang, tambahkan dengan quantity 1
        product.quantity = 1;
        updatedCart.push(product);
      }

      setCartItems(updatedCart);
      // Simpan keranjang ke localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Redirect ke halaman login jika belum login
      // ...
    }
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Hapus token dari localStorage saat logout
    localStorage.removeItem('token');
  };

  // Fungsi untuk mengubah jumlah item di keranjang
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    setCartItems(updatedCart);
    // Simpan keranjang ke localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Fungsi untuk checkout
  const handleCheckout = () => {
    // Lakukan logika checkout
    // ...

    // Setelah checkout, kosongkan keranjang
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemCount={cartItems.length} />
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage isLoggedIn={isLoggedIn} onAddToCart={handleAddToCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onQuantityChange={handleQuantityChange}
                onCheckout={handleCheckout}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
