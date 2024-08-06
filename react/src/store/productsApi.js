import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';
import getHeaders from '../utils/getHeaders.js';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.productsPath(),
    prepareHeaders: (headers) => getHeaders(headers),
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (body) => `${body}`,
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    patchProduct: builder.mutation({
      query: ({id, product}) => ({
        url: `${id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  usePatchProductMutation,
  useRemoveProductMutation,
} = productsApi;

/*
(result) => result
      ? [...result.map((prod) => ({type: 'Product', id: prod.id})), {type: 'Product', id: 'ADD'}, {type: 'Product', id: 'REMOVE'}]
      : [{type: 'Product', id: 'ADD'}, {type: 'Product', id: 'REMOVE'}],

[{type: 'Product', id: 'ADD'}],

(result, error, { id }) => [{type: 'Product', id }],

 [{type: 'Product', id: 'REMOVE'}],
 */