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
      query: ({ token, tab, PageNum }) => ({
        url: `/api/apptRecords?status=${tab}&page=${PageNum}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    reservationRatePost: builder.mutation({
      query: ({ token, AppointmentId, Comment, Star }) => ({
        url: '/api/PostAppointmentsComment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          AppointmentId,
          Comment,
          Star,
        },
      }),
    }),
    reservationRateGet: builder.query({
      query: ({ token, AppointmentId }) => ({
        url: `/api/GetAppointmentsCommit?AppointmentId=${AppointmentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useEditInformationPutMutation, useReservationDataGetQuery, useReservationRatePostMutation, useReservationRateGetQuery } = userCenter;

// /api/GetAppointmentsCommit?AppointmentId=171
