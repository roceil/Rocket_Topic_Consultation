import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userCenter = createApi({
  reducerPath: 'userCenter',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    editInformationPut: builder.mutation({
      query: ({ token, value }) => ({
        url: '/api/users',
        method: 'PUT',
        body: { Name: value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    resetPasswordPost: builder.mutation({
      query: ({ token, Password, ConfirmPassword }) => ({
        url: '/api/resetPassword',
        method: 'POST',
        body: { Password, ConfirmPassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useEditInformationPutMutation, useResetPasswordPostMutation } = userCenter;
