import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage({ cartItems, onQuantityChange, onCheckout }) {
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isInvalidQuantity, setIsInvalidQuantity] = useState(false);

  useEffect(() => {
    setIsCheckout(false);
    setIsInvalidQuantity(false);
  }, [cartItems]);

  const handleCheckout = () => {
    // Periksa ketersediaan stok sebelum checkout
    const invalidQuantityItem = cartItems.find((item) => item.quantity > item.available);

    if (invalidQuantityItem) {
      setIsInvalidQuantity(true);
    } else {
      // Kurangi stok setiap item sesuai dengan quantity yang dimasukkan
      onCheckout(cartItems);

      setIsCheckout(true);

      // Redirect ke halaman home setelah checkout
      navigate('/');
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    // Periksa apakah quantity melebihi stok
    const invalidQuantityItem = updatedCart.find((item) => item.quantity > item.available);
    if (invalidQuantityItem) {
      setIsInvalidQuantity(true);
    } else {
      setIsInvalidQuantity(false);
      onQuantityChange(productId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Anda belum memilih item.</p>
      ) : (
        <div>
          {isInvalidQuantity && (
            <p className="text-red-600">
              Beberapa item memiliki quantity lebih besar daripada stok yang tersedia.
            </p>
          )}
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300">Product</th>
                <th className="border border-gray-300">Price</th>
                <th className="border border-gray-300">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300">{item.title}</td>
                  <td className="border border-gray-300">${item.price}</td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.available}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCheckout} className="bg-blue-500 text-white rounded-md p-2 mt-4">
            Checkout
          </button>
          {isCheckout && <p>Checkout berhasil. Redirecting to home...</p>}
        </div>
      )}
    </div>
  );
}

export default CartPage;
