import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatRoom = createApi({
  reducerPath: 'chatRoom',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getChatRoomList: builder.query({
      query: ({ token, id, type }) => ({
        url: `/api/chatroom/lastMsgTarget?Id=${id}&Type=${type}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getChatMessage: builder.query({
      query: ({ token, CounselorId, UserId, UserType }) => ({
        url: `/api/chatroom/GetChatlogs?CounselorId=${CounselorId}&UserId=${UserId}&UserType=${UserType}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        keepUnusedDataFor: 1,

      }),

    }),
    postChatMessage: builder.mutation({
      query: ({ token, CounselorId, UserId, UserType }) => ({
        url: `/api/chatroom/GetChatlogs?CounselorId=${CounselorId}&UserId=${UserId}&UserType=${UserType}`,
        method: 'POST',
        body: {
          Id: 0,
          CounselorId: 0,
          UserId: 0,
          Type: 'string',
          Content: 'string',
          InitDate: '2023-04-18T06:37:35.361Z',
          UserRead: true,
          CounselorRead: true,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetChatRoomListQuery, useGetChatMessageQuery, usePostChatMessageMutation } = chatRoom;
export const { getChatMessage } = chatRoom.endpoints;

