import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counselorList = createApi({
  reducerPath: 'counselorList',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCounselorList: builder.query({
      query: () => '/api/counselorList',
    }),
  }),
});

export const { useGetCounselorListQuery } = counselorList;
