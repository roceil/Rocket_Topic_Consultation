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
    const paymentResult = req.body as PaymentResult;
    console.log('paymentResult', paymentResult);
    // 在这里处理付款结果，例如将付款结果存入数据库等操作

    router.push('/success');
  } else {
    res.setHeader('Allow', ['POST']);
    if (req.method !== 'POST') {
      router.push('/success');
    }
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

