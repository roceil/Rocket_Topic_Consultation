import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counselorReservation = createApi({
  reducerPath: 'counselorReservation',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    CounselorReservationDataGet: builder.query({
      query: ({ token, tab, page }) => ({
        url: `/api/usersAppts?status=${tab}&page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: (result: { id: number }[]) => (result
          ? [
            ...result.map(({ id }) => ({ type: 'CounselorReservationData', id })),
            { type: 'CounselorReservationData', id: 'LIST' },
          ]
          : [{ type: 'CounselorReservationData', id: 'LIST' }]),
        invalidatesTags: [{ type: 'CounselorReservationData', id: 'LIST' }],
      }),
    }),
    CounselorCaseRecordPost: builder.mutation({
      query: ({ token, User }) => ({
        url: '/api/AppointmentsRecordLogs',
        method: 'POST',
        body: {
          Name: User,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    CounselorCaseFormDataPost: builder.mutation({
      query: ({ token, AppointmentId }) => ({
        url: '/api/AppointmentsRecord',
        method: 'POST',
        body: {
          AppointmentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    CounselorAcceptOrderPost: builder.mutation({
      query: ({ token, AppointmentId }) => ({
        url: '/api/acceptAppt',
        method: 'POST',
        body: {
          AppointmentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    CounselorChangeOrderPost: builder.mutation({
      query: ({ token, AppointmentId, Reason }) => ({
        url: '/api/reAppt',
        method: 'POST',
        body: {
          AppointmentId,
          Reason,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCounselorReservationDataGetQuery,
  useCounselorCaseRecordPostMutation,
  useCounselorCaseFormDataPostMutation,
  useCounselorAcceptOrderPostMutation,
  useCounselorChangeOrderPostMutation,
} = counselorReservation;

