import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resetPassword = createApi({
  reducerPath: 'resetPassword',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    resetPasswordPostApi: builder.mutation({
      query: (body) => ({
        url: '/api/resetPassword/guid',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useResetPasswordPostApiMutation } = resetPassword;

