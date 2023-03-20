/* eslint-disable react/jsx-props-no-spreading */
import Image from 'next/image';
import {
  Button,
  ConfigProvider, Form, Input, Tabs, Upload, message, Switch,
} from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import user from '../../public/images/user.svg';
import profile from '../../public/images/profile.svg';
import edit from '../../public/images/Edit.svg';
import { darkBtn, IButton, lightBtn } from '../components/Public/IButton';

const conselor1 = {
  name: '李森',
  id: 1,
  LicenseNum: 12345678,
  slogan: '您的諮商年資、特殊經歷等...',
  introduce: '您好！我是一位經驗豐富的諮商師，專門提供情緒支持、心理諮詢、人際關係建設等方面的服務。我擁有豐富的臨床經驗，並且持有心理學相關的學位和專業認證。我以富有同理心、耐心和關注每位來訪者的需求為信念，努力協助您渡過生命難關',
};

interface CounselorProps {
  name: string;
  id: number;
  LicenseNum: number;
  slogan: string;
  introduce: string;
}

type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

function InfoForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name, id, LicenseNum, slogan, introduce,
}:CounselorProps) {
  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const formItemLayout = formLayout === 'vertical' ? { labelCol: { span: 24 }, wrapperCol: { offset: 0 } } : null;

  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  // Upload
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // 個人簡介
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };

  // Switch
  const SwitchOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <div className="w-full px-4 space-y-12 lg:border-b pb-12">
        <div className="space-y-5">
          <div className="bg-[#EEECFA] text-center rounded-lg py-2 text-base font-bold">
            <h3>會員資料</h3>
          </div>
          <div className="space-y-[4.5px] lg:mx-[15px]">
            <p className="text-sm font-bold">會員帳號</p>
            <p className="text-sm">hellohellohellohello@gamil.com</p>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: '#5D5A88',
                colorText: '#5D5A88',
                colorBorder: '#D4D2E3',
                colorIcon: '#5D5A88',
                fontSize: 14,
                borderRadius: 10,
              },
            }}
          >
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              name="conselorCenter"
              onFinish={onFinish}
              style={{
                maxWidth: 380,
              }}
              className="space-y-8"
              labelAlign="left"
            >
              <Form.Item name="重設密碼" label="重設密碼" className="font-bold lg:w-[124px] lg:mx-[15px]">
                <Button className="font-normal" block style={{ height: 40 }}>點我重設密碼</Button>
              </Form.Item>
              <Form.Item name="會員姓名" label="會員姓名" className="font-bold lg:w-[584px] lg:mx-[15px]">
                <Input placeholder={name} className="font-normal" style={{ height: 40 }} />
              </Form.Item>
              <Form.Item
                name="upload"
                label="諮商師執照"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="font-bold lg:w-[584px] lg:mx-[15px]"
              >
                <Upload {...props}>
                  <Button
                    icon={<PlusCircleFilled />}
                    style={{ height: 40, width: 314 }}
                  >
                    000.png
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item name="諮商師證書字號" label="諮商師證書字號" className="font-bold lg:w-[584px] lg:mx-[15px]">
                <Input placeholder={`${LicenseNum}`} className="font-normal" style={{ height: 40 }} />
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
        <div className="space-y-5">
          <div className="bg-[#EEECFA] text-center rounded-lg">
            <h3 className="py-2 text-base font-bold">個人簡介</h3>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: '#5D5A88',
                colorText: '#5D5A88',
                colorBorder: '#D4D2E3',
                colorIcon: '#5D5A88',
                fontSize: 14,
                borderRadius: 10,
              },
            }}
          >
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              name="conselorCenter"
              onFinish={onFinish}
              style={{
                maxWidth: 380,
              }}
              className="space-y-8"
              labelAlign="left"
            >
              <Form.Item
                name="upload"
                label="個人頭像"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="font-bold lg:mx-[15px]"
              >
                <Upload {...props}>
                  <Button
                    icon={<PlusCircleFilled />}
                    style={{ height: 40, width: 314 }}
                  >
                    000.png
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item name="個人賣點" label="個人賣點" className="font-bold lg:w-[584px] lg:mx-[15px]">
                <TextArea
                  showCount
                  maxLength={12}
                  style={{ height: 40, resize: 'none' }}
                  onChange={onChange}
                  placeholder={`${slogan}`}
                  className="font-normal"
                />
              </Form.Item>
              <Form.Item name="自我介紹" label="自我介紹" className="font-bold lg:w-[584px] lg:mx-[15px]">
                <TextArea
                  showCount
                  maxLength={100}
                  style={{ height: 180, marginBottom: 4 }}
                  onChange={onChange}
                  placeholder={`${introduce}`}
                  className="font-normal"
                />
              </Form.Item>
              <div className="lg:mx-[15px]">
                <h3 className="text-sm font-bold mb-3">介紹影片</h3>
                <div className="border border-[#D4D2E3] rounded-[10px] p-4 space-y-5 lg:w-[584px]">
                  <div className="flex">
                    <p className="w-[56px] mr-4">Youtube影片連結</p>
                    <Input placeholder="請輸入影片連結" className="h-10 w-[207px] bg-primary-light border-none font-normal lg:w-[475px]" />
                  </div>
                  <div className="flex">
                    <p className="w-[56px] mr-4">是否開放</p>
                    <Switch defaultChecked onChange={SwitchOnChange} />
                  </div>
                </div>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
      <div className="space-x-7 flex justify-end mt-12">
        <IButton
          text="編輯"
          bgColor={lightBtn}
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
        />
        <IButton
          text="儲存"
          bgColor={darkBtn}
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
        />
      </div>
    </>
  );
}

const counselorInfoTabAry = [
  {
    key: '基本資料',
    label: '基本資料',
    children: <InfoForm
      name={conselor1.name}
      id={conselor1.id}
      LicenseNum={conselor1.LicenseNum}
      slogan={conselor1.slogan}
      introduce={conselor1.introduce}
    />,
  },
  {
    key: '課程資訊',
    label: '課程資訊',
    children: 'sddfgh',
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

const UserCenterTabAry = [
  {
    label: (
      <div className="flex items-center justify-between space-x-4">
        <Image src={user} alt="user_icon" width={20} height={20} />
        <span className="">個人資料</span>
      </div>
    ),
    key: '個人資料',
    children: (
      <div className="counselorTab -mt-[60px]">
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
          <Tabs
            defaultActiveKey="1"
            items={counselorInfoTabAry}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
    ),
  },
  {
    label: (
      <div className="flex items-center justify-between space-x-4">
        <Image src={profile} alt="user_icon" width={20} height={20} />
        <span className="">預約管理</span>
      </div>
    ),
    key: '預約管理',
    children: '預約管理',
  },
  {
    label: (
      <div className="flex items-center justify-between space-x-4">
        <Image src={edit} alt="user_icon" width={20} height={20} />
        <span className="">個案紀錄</span>
      </div>
    ),
    key: '個案記錄',
    children: '個案記錄',
  },
];
export default function CounselorCenter() {
  return (
    <>
      {/* 手機版 個人資料 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">
            個人資料
          </h2>

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
              <Tabs
                defaultActiveKey="1"
                items={counselorInfoTabAry}
                onChange={onChange}
              />
            </ConfigProvider>
          </div>
        </div>
      </section>

      {/* 電腦版 */}
      <section className="hidden pt-12 pb-28 lg:block lg:pt-[84px] lg:pb-[136px]">
        <div className="container min-h-[calc(100vh-330px)]">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>

          <div className="">
            <h3 className="mb-8 text-xl font-bold text-primary-heavy">
              會員中心
            </h3>
            <div className="userCenterTab">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#767494',
                    colorText: '#767494',
                    fontSize: 16,
                  },
                }}
              >
                <Tabs tabPosition="left" items={UserCenterTabAry} />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
