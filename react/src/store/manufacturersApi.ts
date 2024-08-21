import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.ts';
import getHeaders from '../utils/getHeaders.ts';
import { IManufacturersResponse } from '../types/IManufacturers.ts';

export const manufacturersApi = createApi({
  reducerPath: 'manufacturers',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.manufacturersPath(),
    prepareHeaders: (headers) => getHeaders(headers),
  }),
  endpoints: (builder) => ({
    getManufacturers: builder.query<IManufacturersResponse[], undefined>({
      query: () => '',
    }),
  }),
});

export const {
  useGetManufacturersQuery,
} = manufacturersApi;
