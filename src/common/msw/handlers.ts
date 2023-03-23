/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import { rest } from 'msw';

export const handlers = [
  // 使用者登入 => POST
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Username: '我是用戶名',
      UserID: '123456',
      Authorization: '我是token',
      Message: '登入成功',
    }),
  )),

  // 諮商師登入 => POST
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/counselor/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Username: '我是諮商師名',
      UserID: '09876',
      Authorization: '我是token',
      Message: '登入成功',
    }),
  )),

  // 使用者註冊 => POST
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Message: '註冊成功',
    }),
  )),

  // 諮商師註冊 => POST
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/counselor/register`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Message: '諮商師註冊成功',
    }),
  )),
];
