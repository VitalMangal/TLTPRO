import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.ts';
import getToken from '../utils/getToken.ts';
import { UserRequestType, UserResponseType, CustomizedFetchBaseQueryError } from '../types';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery:  <BaseQueryFn<string | FetchArgs, unknown, CustomizedFetchBaseQueryError, {}>>
    fetchBaseQuery({
    baseUrl: routes.usersPath(),
  }),
  endpoints: (builder) => ({
    getUser: builder.query<UserResponseType, void>({
      query: () => ({
        url: 'me',
        method: 'GET',
        headers: { 'authorization': `Token ${getToken()}` }
      }),
    }),
    loginUser: builder.mutation<UserResponseType, UserRequestType>({
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
