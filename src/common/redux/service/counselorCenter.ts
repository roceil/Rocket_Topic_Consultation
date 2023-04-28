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
      query: ({ token, clickId, Courses, Features }) => ({
        url: 'api/courses',
        method: 'POST',
        body: {
          FieldId: clickId,
          Courses,
          Features,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    CourseDataDelete: builder.mutation({
      query: ({ token, clickId }) => ({
        url: `api/courses?id=${clickId}`,
        method: 'DELETE',
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
    CounselorInfoPut: builder.mutation({
      query: ({ token, CounselorName,
        LicenseImg,
        Photo,
        SellingPoint,
        SelfIntroduction,
        VideoLink,
        IsVideoOpen }) => ({
        url: '/api/counselors',
        method: 'PUT',
        body: {
          Name: CounselorName,
          LicenseImg,
          Photo,
          SellingPoint,
          SelfIntroduction,
          VideoLink,
          IsVideoOpen,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    counselorUpdateImagePostApi: builder.mutation({
      query: ({ file, Account }) => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('Account', Account);
        return {
          url: '/api/updateLicense',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useCoursesDataGetQuery, useCoursesDataPostMutation, useCounselorInfoGetQuery, useCourseDataDeleteMutation, useCounselorInfoPutMutation, useCounselorUpdateImagePostApiMutation } = counselorCenter;

