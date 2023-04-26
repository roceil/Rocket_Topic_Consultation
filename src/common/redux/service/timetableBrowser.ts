import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const timetableBrowser = createApi({
  reducerPath: 'timetableBrowser',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCounselorTimetable: builder.query({
      query: ({ token }) => ({ url: '/api/timetables',
        headers: {
          Authorization: `Bearer ${token}`,
        } }),
    }),
    CounselorTimetablePost: builder.mutation({
      query: ({ token, StartDate, EndDate, WeekData }) => ({
        url: '/api/timetables',
        method: 'POST',
        body: {
          StartDate,
          EndDate,
          WeekData,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: (result: { id: number }[]) => (result
          ? [
            ...result.map(({ id }) => ({ type: 'CounselorTimetablePost', id })),
            { type: 'CounselorTimetablePost', id: 'LIST' },
          ]
          : [{ type: 'CounselorTimetablePost', id: 'LIST' }]),
        invalidatesTags: [{ type: 'CounselorTimetablePost', id: 'LIST' }],
      }),
    }),
    timetableBrowserGet: builder.query({
      query: ({ counselorId, pageNum }) => ({
        url: `/api/timetableBrowser?id=${counselorId}&page=${pageNum}`,
      }),
    }),
  }),
});

export const { useGetCounselorTimetableQuery, useTimetableBrowserGetQuery, useCounselorTimetablePostMutation } = timetableBrowser;
