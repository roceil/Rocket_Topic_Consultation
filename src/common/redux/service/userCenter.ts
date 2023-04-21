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
    reservationDataGet: builder.query({
      query: ({ token, tab, pageNum }) => ({
        url: `/api/apptRecords?status=${tab}&page=${pageNum}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    userAppointmentPost: builder.mutation({
      query: ({ token, AppointmentId, AppointmentTimeId, DateTimeValue }) => ({
        url: '/api/apptTime',
        method: 'POST',
        body: {
          AppointmentId,
          AppointmentTimeId,
          DateTimeValue,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useEditInformationPutMutation, useReservationDataGetQuery, useUserAppointmentPostMutation } = userCenter;
