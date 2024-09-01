import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi.ts';
import { manufacturersApi } from './manufacturersApi.ts';
import { productsApi } from './productsApi.ts';

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [manufacturersApi.reducerPath]: manufacturersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(usersApi.middleware)
    .concat(manufacturersApi.middleware)
    .concat(productsApi.middleware)
});
