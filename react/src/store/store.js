import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi.js';
import { manufacturersApi } from './manufacturersApi.js';
import { productsApi } from './productsApi.js';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [manufacturersApi.reducerPath]: manufacturersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(usersApi.middleware)
    .concat(manufacturersApi.middleware)
    .concat(productsApi.middleware)
});
