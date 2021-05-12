import counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';
import searchReducer from '../features/product/searchSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    search: searchReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;