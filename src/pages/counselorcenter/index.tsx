import { ConfigProvider, Tabs } from 'antd';
import CounselorCenterLayout from '../../modules/counselorCenter/CounselorCenterLayout';

// interface CounselorProps {
//   name: string;
//   LicenseNum: number;
//   slogan: string;
//   introduce: string;
// }

export default function index() {
  const counselorInfoTabAry = [
    {
      key: '基本資料',
      label: '基本資料',
      children: (
        <p>123</p>
        // <InfoForm
        //   name={conselor1.name}
        //   id={conselor1.id}
        //   LicenseNum={conselor1.LicenseNum}
        //   slogan={conselor1.slogan}
        //   introduce={conselor1.introduce}
        // />
      ),
    },
    {
      key: '課程資訊',
      label: '課程資訊',
      children: <p>456</p>,
    },
    {
      key: '預約時段',
      label: '預約時段',
      children: 'Content of Tab Pane 1',
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      {/* 手機版 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">個人資料</h2>

          <div className="counselorTab mx-4">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#767494',
                  colorText: '#767494',
                  fontSize: 16,
                  margin: 32,
                },
              }}
            >
              <Tabs defaultActiveKey="1" items={counselorInfoTabAry} onChange={onChange} />
            </ConfigProvider>
          </div>
        </div>
      </section>
      {/* 電腦版 */}
      <CounselorCenterLayout>
        <p>123</p>
      </CounselorCenterLayout>
    </>
  );
}
