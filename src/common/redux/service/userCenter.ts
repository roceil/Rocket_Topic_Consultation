import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userCenter = createApi({
  reducerPath: 'userCenter',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    editInformationPut: builder.mutation({
      query: ({ token, value }) => ({
        url: 'api/users',
        method: 'PUT',
        body: { Name: value },
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useEditInformationPutMutation } = userCenter;
