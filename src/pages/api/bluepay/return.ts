/* eslint-disable import/no-extraneous-dependencies */
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const corsMiddleware = cors(corsOptions);
  corsMiddleware(req, res, () => {
    if (req.method !== 'POST') {
      res.redirect(302, '/success');
      return;
    }
    if (req.method === 'POST') {
      res.redirect(302, '/success');
      return;
    }

    // 確認藍新回傳的交易狀態為完成
    const tradeStatus = req.query.TradeStatus;
    if (tradeStatus !== 'SUCCESS') {
      // 交易狀態不是成功，重導向到錯誤頁面
      res.status(302).redirect('/success');
      return;
    }

    // 處理完成後重導向到指定的成功頁面
    res.status(302).redirect('/success');
  });
}
