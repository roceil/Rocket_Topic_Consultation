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
  }),
});

export const { useCoursesDataGetQuery } = counselorCenter;

// get -> query，其他 mutation，裡面補上 method
// 寫完 slice -> store 註冊 -> 接 API (繪出要的API到指定頁面)
