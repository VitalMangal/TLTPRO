import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.ts';
import getHeaders from '../utils/getHeaders.ts';
import { CustomizedFetchBaseQueryError, ManufacturersResponseType } from '../types';

export const manufacturersApi = createApi({
  reducerPath: 'manufacturers',
  baseQuery: <BaseQueryFn<string | FetchArgs, unknown, CustomizedFetchBaseQueryError, {}>>
     fetchBaseQuery({
      baseUrl: routes.manufacturersPath(),
      prepareHeaders: (headers) => getHeaders(headers),
    }),
  endpoints: (builder) => ({
    getManufacturers: builder.query<ManufacturersResponseType[], void>({
      query: () => '',
    }),
  }),
});

export const {
  useGetManufacturersQuery,
} = manufacturersApi;
