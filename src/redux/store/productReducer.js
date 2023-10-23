import { ActionTypes } from '../actions/actionTypes';

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case ActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };

    case ActionTypes.UPDATE_PRODUCT_STOCK:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? { ...product, stock: action.payload.newStock }
            : product
        ),
      };

    case ActionTypes.UPDATE_PRODUCT_DETAILS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? { ...product, details: action.payload.newDetails }
            : product
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
