import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.ts';
import getHeaders from '../utils/getHeaders.ts';
import { 
  IProductAdd, 
  IProductResponse, 
  IProductRequestParams, 
  IProductPatch,
  IProductResponseDelete,
  IError,
} from '../types/Product.ts';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.productsPath(),
    prepareHeaders: (headers) => getHeaders(headers),
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<IProductResponse[] | IError, IProductRequestParams>({
      query: ({limit, page, q}: IProductRequestParams) => ({
        url: '',
        params: {
          _limit: limit,
          _page: page,
          q: q,
        }
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query<IProductResponse | IError, number>({
      query: (id: number) => `${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<IProductResponse | IError, IProductAdd>({
      query: (product) => ({
        url: ``,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    patchProduct: builder.mutation<IProductResponse | IError, IProductPatch>({
      query: ({id, product}) => ({
        url: `${id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    removeProduct: builder.mutation<IProductResponseDelete | IError, number>({
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
