import { createStore, combineReducers } from 'redux';
import cartReducer from './cartReducer'; // Pastikan ini sesuai dengan jalur berkas
import productReducer from './productReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
