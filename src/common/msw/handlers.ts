/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import { rest } from 'msw';

export const handlers = [
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Username: '我是用戶名',
      UserID: '123456',
      Authorization: '我是token',
      Message: '登入成功',
    }),
  )),
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/counselor/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      Username: '我是諮商師名',
      UserID: '09876',
      Authorization: '我是token',
      Message: '登入成功',
    }),
  )),
];
