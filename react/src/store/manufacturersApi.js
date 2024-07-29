import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';
import getHeaders from '../utils/getHeaders';

export const manufacturersApi = createApi({
  reducerPath: 'manufacturers',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.manufacturersPath(),
    prepareHeaders: (headers) => getHeaders(headers),
  }),
  endpoints: (builder) => ({
    getManufacturers: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useGetManufacturersQuery,
} = manufacturersApi;
