import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const login = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    userLoginPostApi: builder.mutation({
      query: (body) => ({
        url: '/api/user/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUserLoginPostApiMutation } = login;
