/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import { rest } from 'msw';

export const handlers = [
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      username: '我是用戶名',
      userID: '123456',
      authorization: '我是token',
      message: '登入成功',
    }),
  )),
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/counselor/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      username: '我是諮商師名',
      userID: '09876',
      authorization: '我是token',
      message: '登入成功',
    }),
  )),

  // 忘記密碼 => POST
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgotPassword`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Message: 'Email已發送，請檢查信箱',
    }),
  )),

  // 重設密碼 => POST
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resetPassword`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Message: '密碼重設成功，請重新登入',
    }),
  )),
];
