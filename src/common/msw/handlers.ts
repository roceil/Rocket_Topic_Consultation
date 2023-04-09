/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import { rest } from 'msw';
import { counselorListAPI } from '@/lib/counselorList/counselorData';

export const handlers = [
  // 使用者登入 => POST =>已接通
  // rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, (req, res, ctx) => res(
  //   ctx.status(200),
  //   ctx.json({
  //     Username: '我是用戶名',
  //     Identity: 'user',
  //     UserID: '123456',
  //     Authorization: 'bear-token-123456789',
  //     Message: '登入成功',
  //   }),
  // )),

  // 諮商師登入 => POST =>已接通
  // rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/counselor/login`, (req, res, ctx) => res(
  //   ctx.status(200),
  //   ctx.json({
  //     Username: '我是諮商師名',
  //     Identity: 'counselor',
  //     Validation: false,
  //     UserID: '09876',
  //     Authorization: '我是token',
  //     Message: '登入成功',
  //   }),
  // )),

  // 使用者註冊 => POST =>已接通
  // rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, (req, res, ctx) => res(
  //   ctx.status(200),
  //   ctx.json({
  //     Message: '註冊成功',
  //   }),
  // )),

  // 諮商師註冊 => POST =>已接通
  // rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/counselor/register`, (req, res, ctx) => res(
  //   ctx.status(200),
  //   ctx.json({
  //     Message: '諮商師註冊成功',
  //   }),
  // )),

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

  // 諮商師總覽 => GET
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/counselorList/1`, (req, res, ctx) => res(ctx.status(200), ctx.json(counselorListAPI))),

  // 諮商師總覽 => GET
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/counselorList/2`, (req, res, ctx) => res(ctx.status(200), ctx.json(counselorListAPI))),

  // 諮商師總覽 => GET
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/counselorList/3`, (req, res, ctx) => res(ctx.status(200), ctx.json(counselorListAPI))),

  // 諮商師總覽 => GET
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/counselorList/4`, (req, res, ctx) => res(ctx.status(200), ctx.json(counselorListAPI))),

  // 諮商師總覽 => GET
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/counselorList/5`, (req, res, ctx) => res(ctx.status(200), ctx.json(counselorListAPI))),

];
