// cartActions.js

export const ADD_TO_CART = 'ADD_TO_CART'; // Tambahkan konstanta aksi
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; // Tambahkan konstanta aksi
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'; // Tambahkan konstanta aksi
export const CHECKOUT = 'CHECKOUT'; // Tambahkan konstanta aksi

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART, // Gunakan konstanta aksi yang telah ditambahkan
    payload: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART, // Gunakan konstanta aksi yang telah ditambahkan
    payload: productId,
  };
};

export const changeQuantity = (productId, newQuantity) => {
  return {
    type: UPDATE_QUANTITY, // Gunakan konstanta aksi yang telah ditambahkan
    payload: {
      productId,
      quantity: newQuantity,
    },
  };
};

export const clearCart = () => {
  return {
    type: CHECKOUT, // Gunakan konstanta aksi yang telah ditambahkan
  };
};
