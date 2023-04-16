import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counselorPage = createApi({
  reducerPath: 'counselorPage',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    addToCartPost: builder.mutation({
      query: ({ token, CounselorId, FieldId, chooseCase }) => ({
        url: '/api/cart',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          CounselorId,
          FieldId,
          Item: chooseCase,
        },
      }),
    }),
  }),
});

export const { useAddToCartPostMutation } = counselorPage;
