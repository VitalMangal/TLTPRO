import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';
import getToken from '../utils/getToken.js'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.usersPath(),
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: 'me',
        method: 'GET',
        headers: { 'authorization': `Token ${getToken()}` }
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetUserQuery,
} = usersApi;
