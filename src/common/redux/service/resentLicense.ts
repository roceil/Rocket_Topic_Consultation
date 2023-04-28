import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resentLicense = createApi({
  reducerPath: 'resentLicense',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    resentLicensePost: builder.mutation({
      query: ({ file, guid }) => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('guid', guid);
        return {
          url: '/api/updateGuidLicense',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${guid}`,
          },
          body: formData,
        };
      },
    }),
  }),
});

export const { useResentLicensePostMutation } = resentLicense;
