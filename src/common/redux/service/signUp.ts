import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signUp = createApi({
  reducerPath: 'signUp',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    userSignUpPostApi: builder.mutation({
      query: (body) => ({
        url: '/api/user/register',
        method: 'POST',
        body,
      }),
    }),
    counselorSignUpPostApi: builder.mutation({
      query: (body) => ({
        url: '/api/counselor/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCounselorSignUpPostApiMutation, useUserSignUpPostApiMutation } = signUp;
