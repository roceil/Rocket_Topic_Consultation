import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const forgetPassword = createApi({
  reducerPath: 'forgetPassword',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    forgetPasswordPostApi: builder.mutation({
      query: (body) => ({
        url: '/api/forgotPassword',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useForgetPasswordPostApiMutation } = forgetPassword;

