import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';

interface PaymentResult {
  // 請根據您在藍新金流後台設定的 JSON 欄位名稱修改這裡的屬性名稱
  Status: string; // 商店代號
  MerchantID: string; // 加密資料
  TradeInfo: string; // 交易檢查碼
  Version: string; // 串接程式版本
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const router = useRouter();

  if (req.method === 'POST') {
    const paymentResult = req.body as PaymentResult; // 將 req.body 強制轉換為 PaymentResult 類型
    console.log('paymentResult', paymentResult);
    // 在這裡進行付款結果的處理，例如將付款結果存入數據庫等操作

    router.push('/success'); // 跳轉到付款成功的頁面
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
