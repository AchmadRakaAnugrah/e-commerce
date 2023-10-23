import { ActionTypes } from './actionTypes';

export const setProducts = (products) => {
    return {
      type: 'SET_PRODUCTS', // This should be a string that describes the action
      payload: products,
    };
  };
  
// Aksi untuk menambah produk
export const addProduct = (product) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload: product,
});

// Aksi untuk menghapus produk
export const removeProduct = (productId) => ({
  type: ActionTypes.REMOVE_PRODUCT,
  payload: productId,
});

// Aksi untuk mengupdate stok produk
export const updateProductStock = (productId, newStock) => ({
  type: ActionTypes.UPDATE_PRODUCT_STOCK,
  payload: {
    productId,
    newStock,
  },
});

// Aksi untuk mengupdate detail produk
export const updateProductDetails = (productId, newDetails) => ({
  type: ActionTypes.UPDATE_PRODUCT_DETAILS,
  payload: {
    productId,
    newDetails,
  },
});
