import { ActionTypes } from '../actions/actionTypes'; // Perubahan path

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // Tambahkan logika untuk menambah item ke dalam keranjang
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case ActionTypes.REMOVE_FROM_CART:
      // Tambahkan logika untuk menghapus item dari keranjang berdasarkan ID atau kriteria lain
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case ActionTypes.UPDATE_QUANTITY:
      // Tambahkan logika untuk mengupdate jumlah item dalam keranjang
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case ActionTypes.CHECKOUT:
      // Tambahkan logika untuk checkout dan mengurangi stok produk
      // Anda perlu merujuk ke produk di state global untuk mengurangi stok
      return state;

    default:
      return state;
  }
};

export default cartReducer;
