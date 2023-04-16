import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resetPassword = createApi({
  reducerPath: 'resetPassword',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    // 從 mail 重設密碼
    resetPasswordPostApi: builder.mutation({
      query: (body) => ({
        url: '/api/resetPassword/guid',
        method: 'POST',
        body,
      }),
    }),
    // 從 modal 重設密碼
    resetPasswordModalPost: builder.mutation({
      query: ({ token, Password, ConfirmPassword }) => ({
        url: '/api/resetPassword',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { Password, ConfirmPassword },
      }),
    }),
  }),
});

export const { useResetPasswordPostApiMutation, useResetPasswordModalPostMutation } = resetPassword;
