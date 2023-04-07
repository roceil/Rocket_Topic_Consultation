import Image from 'next/image';
import {
  Button,
  ConfigProvider, Form, Input, Tabs, Upload, message, Switch, Select,
} from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';

import { PlusCircleFilled } from '@ant-design/icons';
import { IButton } from '@/common/components/IButton';

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
  // 控制 disabled
  const [editInfo, setEditInfo] = useState<boolean>(true);
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
                <Input disabled={editInfo} placeholder={name} className="font-normal" style={{ height: 40 }} />
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
                    disabled={editInfo}
                  >
                    000.png
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item name="諮商師證書字號" label="諮商師證書字號" className="font-bold lg:w-[584px] lg:mx-[15px]">
                <Input placeholder={`${LicenseNum}`} className="font-normal" style={{ height: 40 }} disabled={editInfo} />
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
                    disabled={editInfo}
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
                  disabled={editInfo}
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
                  disabled={editInfo}
                />
              </Form.Item>
              <div className="lg:mx-[15px]">
                <h3 className="text-sm font-bold mb-3">介紹影片</h3>
                <div className="border border-[#D4D2E3] rounded-[10px] p-4 space-y-5 lg:w-[584px]">
                  <div className="flex">
                    <p className="w-[56px] mr-4">Youtube影片連結</p>
                    <Input placeholder="請輸入影片連結" className="h-10 w-[207px] bg-primary-light border-none font-normal lg:w-[475px]" disabled={editInfo} />
                  </div>
                  <div className="flex">
                    <p className="w-[56px] mr-4">是否開放</p>
                    <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
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
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
          onClick={() => setEditInfo(false)}
        />
        {!editInfo && (
        <IButton
          text="儲存"
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
        />
        )}
      </div>
    </>
  );
}

function ClassInfo() {
  // 控制『專長領域』樣式
  const [BtnState, setBtnState] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
    btn6: false,
  });
  // 控制 disabled
  const [editInfo, setEditInfo] = useState<boolean>(true);
  // Form
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  // Switch
  const SwitchOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  // 下拉選單
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // 課程特色
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };
  return (
    <>
      <div className="px-5 lg:mt-2 space-y-12">
        <div className="flex">
          <h3 className="font-bold mr-2">專長領域 *</h3>
          <div className="space-x-3">
            <IButton
              text="一般成人"
              // bgColor={BtnState.btn1 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn1: !BtnState.btn1,
                });
              }}
            />
            <IButton
              text="親密關係"
              // bgColor={BtnState.btn2 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn2: !BtnState.btn2,
                });
              }}
            />
            <IButton
              text="青少年"
              // bgColor={BtnState.btn3 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn3: !BtnState.btn3,
                });
              }}
            />
            <IButton
              text="女性議題"
              // bgColor={BtnState.btn4 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn4: !BtnState.btn4,
                });
              }}
            />
            <IButton
              text="PTSD"
              // bgColor={BtnState.btn5 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn5: !BtnState.btn5,
                });
              }}
            />
            <IButton
              text="中老年議題"
              // bgColor={BtnState.btn6 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn6: !BtnState.btn6,
                });
              }}
            />
          </div>
          <p className="ml-4 mt-7 text-sm">可複選</p>
        </div>
        <div className="flex">
          <h3 className="font-bold mr-2">課程方案 *</h3>
          <div className="rounded-2xl bg-bg2 pb-9">
            <ul className="flex border-b border-secondary  py-5 text-sm font-bold text-primary-heavy lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[25%]">專長領域</li>
              <li className="lg:w-[25%]">課程方案</li>
              <li className="lg:w-[25%]">定價</li>
              <li className="lg:w-[25%]">是否開放</li>
            </ul>
            <ul className="space-y-4 px-3 pt-5 lg:px-0 lg:pt-7 w-[804px]">
              <li className="flex flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#5D5A88',
                      colorText: '#5D5A88',
                      colorBorder: '#D4D2E3',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  <Form
                    form={form}
                    name="classInfo"
                    onFinish={onFinish}
                    style={{ width: 804, display: 'flex' }}
                  >
                    <div className="lg:w-[25%]">
                      <Select
                        disabled={editInfo}
                        defaultValue="一般成人"
                        style={{ width: 108 }}
                        onChange={handleChange}
                        options={[
                          { value: '一般成人', label: '一般成人' },
                          { value: '親密關係', label: '親密關係' },
                          { value: '青少年', label: '青少年' },
                        ]}
                      />
                    </div>
                    {/* 課程方案＋定價 */}
                    <div className="flex flex-col space-y-4">
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">1 堂</div>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Input disabled={editInfo} placeholder="請填寫價格" className="font-normal" style={{ height: 40, width: 124 }} />
                        </Form.Item>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">3 堂</div>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Input disabled={editInfo} placeholder="請填寫價格" className="font-normal" style={{ height: 40, width: 124 }} />
                        </Form.Item>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">5 堂</div>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Input disabled={editInfo} placeholder="請填寫價格" className="font-normal" style={{ height: 40, width: 124 }} />
                        </Form.Item>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">體驗課 1 堂</div>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Input disabled={editInfo} placeholder="請填寫價格" className="font-normal" style={{ height: 40, width: 124 }} />
                        </Form.Item>
                        <Form.Item className="lg:w-[33.33%] mb-0">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </ConfigProvider>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <h3 className="font-bold mr-2">課程特色 *</h3>
          <div className="rounded-2xl bg-bg2 pb-9">
            <ul className="space-y-4 px-3 pt-5 lg:px-0 lg:pt-7 w-[804px]">
              <li className="flex flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#5D5A88',
                      colorText: '#5D5A88',
                      colorBorder: '#D4D2E3',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  <Form
                    form={form}
                    name="classInfo"
                    onFinish={onFinish}
                    style={{ width: 804 }}
                  >
                    <div className="flex items-start px-[56px] mb-[33px]">
                      <Select
                        disabled={editInfo}
                        defaultValue="一般成人"
                        style={{ width: 108 }}
                        onChange={handleChange}
                        options={[
                          { value: '一般成人', label: '一般成人' },
                          { value: '親密關係', label: '親密關係' },
                          { value: '青少年', label: '青少年' },
                        ]}
                      />
                    </div>
                    {/* 課程方案＋定價 */}
                    <Form.Item
                      name="特色 1"
                      label="特色 1"
                      className="px-[56px] mb-8"
                      rules={[
                        {
                          required: true,
                          message: '此項為必填',
                          whitespace: true,
                        }]}
                    >
                      <TextArea
                        showCount
                        maxLength={25}
                        style={{ height: 45, resize: 'none' }}
                        onChange={onChange}
                        placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                        disabled={editInfo}
                      />
                    </Form.Item>
                    <Form.Item
                      name="特色 2"
                      label="特色 2"
                      className="px-[56px] mb-8"
                      rules={[
                        {
                          required: true,
                          message: '此項為必填',
                          whitespace: true,
                        }]}
                    >
                      <TextArea
                        showCount
                        maxLength={25}
                        style={{ height: 45, resize: 'none' }}
                        onChange={onChange}
                        placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                        disabled={editInfo}
                      />
                    </Form.Item>
                    <Form.Item
                      name="特色 3"
                      label="特色 3"
                      className="px-[56px] mb-8"
                      rules={[
                        {
                          required: true,
                          message: '此項為必填',
                          whitespace: true,
                        }]}
                    >
                      <TextArea
                        showCount
                        maxLength={25}
                        style={{ height: 45, resize: 'none' }}
                        onChange={onChange}
                        placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                        disabled={editInfo}
                      />
                    </Form.Item>
                    <Form.Item
                      name="特色 4"
                      label="特色 4"
                      className="px-[56px] mb-8"
                    >
                      <TextArea
                        showCount
                        maxLength={25}
                        style={{ height: 45, resize: 'none' }}
                        onChange={onChange}
                        placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                        disabled={editInfo}
                      />
                    </Form.Item>
                    <Form.Item
                      name="特色 5"
                      label="特色 5"
                      className="px-[56px] mb-8"
                    >
                      <TextArea
                        showCount
                        maxLength={25}
                        style={{ height: 4, resize: 'none' }}
                        onChange={onChange}
                        placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                        disabled={editInfo}
                      />
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="space-x-7 flex justify-end mt-12">
        <IButton
          text="編輯"
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
          onClick={() => setEditInfo(false)}
        />
        {!editInfo && (
        <IButton
          text="儲存"
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
        />
        )}

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
    children: <ClassInfo />,
  },
  {
    key: '預約時段',
    label: '預約時段',
    children: 'Content of Tab Pane 1',
  },
];

// 控制右側選單函式
function CounselorInfoTab() {
  // 顯示分頁位置函式
  const onChange = (key: string) => {
    console.log('🚀 ~ file: reservation.tsx:23 ~ onChange ~ key:', key);
  };
  return (
    <div className="counselorTab">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4A5364',
            colorText: '#9E9E9E',
            fontSize: 16,
            margin: 32,
          },
        }}
      >
        <Tabs defaultActiveKey="會員資料" items={counselorInfoTabAry} onChange={onChange} />
      </ConfigProvider>
    </div>
  );
}

export default function CounselorCenter() {
  return (
    <>
      {/* 手機版 個人資料 */}
      <section className="hidden pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
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
              <CounselorInfoTab />
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
                <Tabs
                  tabPosition="left"
                  items={counselorInfoTabAry}
                  defaultActiveKey="預約管理"
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
