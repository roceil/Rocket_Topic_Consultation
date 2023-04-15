import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counselorCenter = createApi({
  reducerPath: 'counselorCenter',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    CoursesDataGet: builder.query({
      query: ({ token }) => ({
        url: 'api/courses',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    CoursesDataPost: builder.mutation({
      query: ({ token, body }) => ({
        url: 'api/courses',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    CounselorInfoGet: builder.query({
      query: ({ token }) => ({
        url: 'api/counselors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCoursesDataGetQuery, useCoursesDataPostMutation, useCounselorInfoGetQuery } = counselorCenter;

// get -> query，其他 mutation，裡面補上 method
// 寫完 slice -> store 註冊 -> 接 API (繪出要的API到指定頁面)
