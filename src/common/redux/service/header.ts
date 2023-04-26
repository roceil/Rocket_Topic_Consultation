import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const header = createApi({
  reducerPath: 'header',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    zoomLinkGet: builder.query({
      query: ({ token }) => ({
        url: '/api/getZoomUrl',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useZoomLinkGetQuery } = header;
