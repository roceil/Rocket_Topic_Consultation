import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { QueryCache } from 'react-query';

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
      query: ({ token , id, }) => ({
        url: 'api/courses',
        method: 'POST',
        body: {
          FieldId,
          Courses: [
            {
              Item: '一堂',
              Quantity: 1,
              Price: 2000,
              Availability: false,
            },
            {
              Item: '三堂',
              Quantity: 3,
              Price: 6000,
              Availability: false,
            },
            {
              Item: '五堂',
              Quantity: 5,
              Price: 9000,
              Availability: false,
            },
            {
              Item: '體驗課一堂',
              Quantity: 1,
              Price: 800,
              Availability: true,
            },
          ],
          Features:
            {
              Feature1: '2000',
              Feature2: '菲菲2',
              Feature3: '菲菲3',
              Feature4: 'ccccc',
              Feature5: 'bbbbb',
            },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // onSuccess: () => {
      //   QueryCache.invalidateQueries('CoursesDataGet');
      // },
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
