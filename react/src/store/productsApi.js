import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';
import getHeaders from '../utils/getHeaders.js';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.productsPath(),
    prepareHeaders: (headers) => getHeaders(headers),
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '',
    }),
    getProductById: builder.query({
      query: (id) => id,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        method: 'POST',
        body: product,
      }),
    }),
    editProduct: builder.mutation({
      query: (id, product) => ({
        url: id,
        method: 'PATCH',
        body: product,
      }),
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useEditProductMutation,
  useRemoveProductMutation,
} = productsApi;
