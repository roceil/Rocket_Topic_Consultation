import Head from 'next/head';

interface ICustomHeadProps {
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
  pageCanonicalUrl?: string;
}

export default function CustomHead({ pageTitle, pageDescription, pageImage, pageCanonicalUrl }: ICustomHeadProps) {
  const defaultTitle = '拍拍｜線上心理諮商平台';
  const defaultDescription = '歡迎來到拍拍！拍拍是個線上心理諮商平台，致力於在線上提供高品質、專業的心理諮商服務，幫助人們克服各種情緒和心理上的困難，改善他們的生活品質。';

  const defaultCanonicalUrl = 'https://pi-rocket-coding.vercel.app/';
  const defaultImage = 'https://raw.githubusercontent.com/roceil/Rocket_Topic_Consultation/Feat/AddHead/public/images/head/LDM.png';

  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle}</title>
        <meta name="description" content={pageDescription || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Line */}
        <meta property="line:app_id" content="LINE_APP_ID" />
        <meta property="line:multi_share" content="true" />
        <meta property="og:image" content={pageImage || defaultImage} />

        {/* Discord */}
        <meta property="discord:invite_image" content={defaultImage} />
        <meta property="discord:invite_image:width" content="1200" />
        <meta property="discord:invite_image:height" content="600" />

        {/* Facebook */}
        <meta property="og:site_name" content="拍拍" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageCanonicalUrl || 'https://pi-rocket-coding.vercel.app/'} />
        <meta property="og:title" content={pageTitle || defaultTitle} />
        <meta property="og:description" content={pageDescription || defaultDescription} />
        <meta property="og:image" content={pageImage || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:locale" content="zh_TW" />

        {/* Google */}
        <link rel="canonical" href={pageCanonicalUrl || defaultCanonicalUrl} />
      </Head>

      <h1 className="hidden">{pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle}</h1>
    </>

  );
}
