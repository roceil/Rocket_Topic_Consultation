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
];
