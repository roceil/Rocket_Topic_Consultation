import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 確認藍新回傳的交易狀態為完成
  const tradeStatus = req.query.TradeStatus;
  if (tradeStatus !== 'SUCCESS') {
    // 交易狀態不是成功，重導向到錯誤頁面
    return res.redirect('/404');
  }

  // 藍新回傳的交易資訊
  const tradeInfo = req.query.MerchantTradeNo;
  console.log('🚀 ~ file: success.ts:13 ~ handler ~ tradeInfo:', tradeInfo);

  // 處理完成後重導向到指定的成功頁面
  return res.redirect('/success');
}
