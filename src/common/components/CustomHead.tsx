import Head from 'next/head';

interface ICustomHeadProps {
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
  pageCanonicalUrl?: string;
}

export default function CustomHead({ pageTitle, pageDescription, pageImage, pageCanonicalUrl }: ICustomHeadProps) {
  const defaultTitle = '拍拍｜火箭隊 11T';
  const defaultDescription = '這是一個關於火箭隊 11T的網站，提供了相關的產品介紹、使用心得和最新消息等內容。';
  const defaultImage = 'https://pi-rocket-coding.vercel.app/images/default-image.jpg';

  return (
    <Head>
      <title>{pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={pageDescription || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Facebook */}
      <meta property="og:site_name" content="拍拍" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageCanonicalUrl || 'https://pi-rocket-coding.vercel.app/'} />
      <meta property="og:title" content={pageTitle || defaultTitle} />
      <meta property="og:description" content={pageDescription || defaultDescription} />
      <meta property="og:image" content={pageImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="zh_TW" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:title" content={pageTitle || defaultTitle} />
      <meta name="twitter:description" content={pageDescription || defaultDescription} />
      <meta name="twitter:image" content={pageImage || defaultImage} />

      {/* Line */}
      <meta property="line:app_id" content="LINE_APP_ID" />
      <meta property="line:multi_share" content="true" />

      {/* Discord */}
      <meta property="discord:site" content="Discord" />
      <meta property="discord:site_id" content="1096931336016633916" />
      <meta property="discord:owner" content="DISCORD_OWNER_ID" />
      <meta property="discord:owner_id" content="DISCORD_OWNER_ID" />
      <meta property="discord:bot" content="DISCORD_BOT_ID" />
      <meta property="discord:bot_id" content="DISCORD_BOT_ID" />
      <meta property="discord:invite" content="DISCORD_INVITE_LINK" />

      {/* Google */}
      <link rel="canonical" href={pageCanonicalUrl || 'https://pi-rocket-coding.vercel.app/'} />
      <meta name="google-site-verification" content="YOUR_GOOGLE_SITE_VERIFICATION_CODE" />
    </Head>
  );
}
