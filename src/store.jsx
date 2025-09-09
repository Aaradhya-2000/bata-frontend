// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from './cartSlice';
import reviewsReducer from "./reviewSlice"
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  mycart: cartReducer,
  reviews: reviewsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
