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
    getFilterList: builder.query({
      query: ({ pageId, convertTopic }) => `/api/profiles?page=${pageId}&tag=${convertTopic}`,
    }),
  }),
});

export const { useGetCounselorListQuery, useGetFilterListQuery } = counselorList;
