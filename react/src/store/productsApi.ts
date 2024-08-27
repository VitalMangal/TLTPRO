import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.ts';
import getHeaders from '../utils/getHeaders.ts';
import { ProductAddType, ProductErrorType, ProductPatchType, ProductRequestParams, ProductResponseDeleteType, ProductType } from '../types';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.productsPath(),
    prepareHeaders: (headers) => getHeaders(headers),
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], ProductRequestParams>({
      query: ({limit, page, q}) => ({
        url: '',
        params: {
          _limit: limit,
          _page: page,
          q: q,
        }
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query<ProductType[], number>({
      query: (id: number) => `${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<ProductType[], ProductAddType>({
      query: (product) => ({
        url: ``,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    patchProduct: builder.mutation<ProductType[], ProductPatchType>({
      query: ({id, product}) => ({
        url: `${id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    removeProduct: builder.mutation<ProductResponseDeleteType, number>({
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
