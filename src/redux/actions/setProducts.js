// setProducts.js
import { ActionTypes } from './actionTypes'; // Impor konstanta tipe aksi

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS, // Atur "type" dengan tipe aksi yang sesuai
    payload: products,
  };
};
