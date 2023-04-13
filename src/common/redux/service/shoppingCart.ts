import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shoppingCart = createApi({
  reducerPath: 'shoppingCart',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    deleteItemDelete: builder.mutation({
      query: ({ token, CartId }) => ({
        url: '/api/cart',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          CartId,
        },
      }),
    }),
    finishOrderPost: builder.mutation({
      query: ({ token, ProductId }) => ({
        url: '/api/order',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          ProductId,
        },
      }),
    }),
  }),
});

export const { useDeleteItemDeleteMutation, useFinishOrderPostMutation } = shoppingCart;
