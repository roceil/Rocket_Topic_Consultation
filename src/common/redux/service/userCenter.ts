import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userCenter = createApi({
  reducerPath: 'userCenter',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    editInformationPut: builder.mutation({
      query: ({ token, nameInput }) => ({
        url: '/api/users',
        method: 'PUT',
        body: { Name: nameInput },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    resetPasswordPost: builder.mutation({
      query: ({ token, Password, ConfirmPassword }) => ({
        url: '/api/resetPassword',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { Password, ConfirmPassword },
      }),
    }),
    reservationDataGet: builder.query({
      query: ({ token, tab }) => ({
        url: `/api/apptRecords?status=${tab}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useEditInformationPutMutation, useResetPasswordPostMutation, useReservationDataGetQuery } = userCenter;
