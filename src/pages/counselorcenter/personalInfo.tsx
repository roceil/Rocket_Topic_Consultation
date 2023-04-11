/* eslint-disable react/jsx-props-no-spreading */
import Image from 'next/image';
// eslint-disable-next-line import/no-extraneous-dependencies
import ImgCrop from 'antd-img-crop';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Tabs,
  Upload,
  Switch,
  Select,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';
import { IButton } from '@/common/components/IButton';
import userImg from '../../../public/images/User01.jpg';

const conselor1 = {
  name: '李森',
  id: 1,
  LicenseNum: 12345678,
  slogan: '您的諮商年資、特殊經歷等...',
  introduce:
    '您好！我是一位經驗豐富的諮商師，專門提供情緒支持、心理諮詢、人際關係建設等方面的服務。我擁有豐富的臨床經驗，並且持有心理學相關的學位和專業認證。我以富有同理心、耐心和關注每位來訪者的需求為信念，努力協助您渡過生命難關',
  image: userImg,
};

interface CounselorProps {
  name: string;
  id: number;
  LicenseNum: number;
  slogan: string;
  introduce: string;
  // counselorImage: ;
}
type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 諮商師 > 個人資料 > 基本資料
function InfoForm({
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  LicenseNum,
  slogan,
  introduce,
  // counselorImage,
}: CounselorProps) {
  // Upload 諮商師執照＆頭貼圖檔
  const [filelist, setFilelist] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const uploadOnChange: UploadProps['onChange'] = ({ filelist: newFilelist }) => {
    setFilelist(newFilelist);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  // 控制 disabled
  const [editInfo, setEditInfo] = useState<boolean>(true);

  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const formItemLayout = formLayout === 'vertical'
    ? { labelCol: { span: 24 }, wrapperCol: { offset: 0 } }
    : null;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  // 個人簡介
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value);
  };

  // Switch
  const SwitchOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <div className="w-full space-y-12 px-4 pb-12 lg:border-b">
        <div className="space-y-5">
          <div className="rounded-lg bg-primary py-2 text-center text-base font-bold">
            <h3 className="text-gray-900">會員資料</h3>
          </div>
          <div className="space-y-[4.5px] text-gray-900 lg:mx-[15px]">
            <p className="text-sm font-bold ">會員帳號</p>
            <p className="text-sm">hellohellohellohello@gamil.com</p>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: '#9E9E9E',
                colorText: '#424242',
                colorBorder: '#BDBDBD',
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
              className="space-y-5"
              labelAlign="left"
            >
              <Form.Item
                name="重設密碼"
                label="重設密碼"
                className="font-bold lg:mx-[15px] lg:w-[124px]"
              >
                <Button className="font-normal" block style={{ height: 40 }}>
                  點我重設密碼
                </Button>
              </Form.Item>
              <Form.Item
                name="會員姓名"
                label="會員姓名"
                className="font-bold lg:mx-[15px] lg:w-[584px]"
              >
                <Input
                  disabled={editInfo}
                  placeholder={name}
                  className="font-normal"
                  style={{ height: 40 }}
                />
              </Form.Item>
              <div className="mt-5 space-y-[4.5px] text-gray-900 lg:mx-[15px]">
                <p className="text-sm font-bold ">諮商師證書字號</p>
                <p className="text-sm">{LicenseNum}</p>
              </div>
              <Form.Item
                name="upload"
                label="諮商師執照"
                valuePropName="filelist"
                // getValueFromEvent={normFile}
                className="font-bold lg:mx-[15px]"
              >
                <div className="flex lg:w-[600px] items-end">
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={filelist}
                      onChange={uploadOnChange}
                      onPreview={onPreview}
                      disabled={editInfo}
                    >
                      {filelist.length < 1 && '+ Upload'}
                    </Upload>
                  </ImgCrop>
                  {/* <p className="mx-4 mb-2 -ml-[360px] w-full text-sm font-normal text-gray-600">
                    建議上傳尺寸 640*640 且小於 2MB 的圖片
                  </p> */}
                </div>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
        <div className="space-y-5">
          <div className="rounded-lg bg-primary text-center">
            <h3 className="py-2 text-base font-bold text-gray-900">個人簡介</h3>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: '#9E9E9E',
                colorText: '#424242',
                colorBorder: '#BDBDBD',
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
                valuePropName="filelist"
                // getValueFromEvent={normFile}
                className="font-bold lg:mx-[15px]"
              >
                <div className="flex  lg:w-[600px] items-end">
                  <ImgCrop rotationSlider>
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={filelist}
                      onChange={uploadOnChange}
                      onPreview={onPreview}
                      disabled={editInfo}
                    >
                      {filelist.length < 1 && '+ Upload'}
                    </Upload>
                  </ImgCrop>
                  {/* <p className="mx-4 mb-2 -ml-[360px] w-full text-sm font-normal text-gray-600">
                    建議上傳尺寸 640*640 且小於 2MB 的圖片
                  </p> */}
                </div>
              </Form.Item>
              <Form.Item
                name="個人賣點"
                label="個人賣點"
                className="font-bold lg:mx-[15px] lg:w-[584px]"
              >
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
              <Form.Item
                name="自我介紹"
                label="自我介紹"
                className="font-bold lg:mx-[15px] lg:w-[584px]"
              >
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
                <h3 className="mb-3 text-sm font-bold">介紹影片</h3>
                <div className="space-y-5 rounded-[10px] border border-[#D4D2E3] p-4 lg:w-[584px]">
                  <div className="flex">
                    <p className="mr-4 w-[56px]">Youtube影片連結</p>
                    <Input
                      placeholder="請輸入影片連結"
                      className="bg-primary-light h-10 w-[207px] border-none font-normal lg:w-[475px]"
                      disabled={editInfo}
                    />
                  </div>
                  <div className="flex">
                    <p className="mr-4 w-[56px]">是否開放</p>
                    <Switch
                      defaultChecked
                      onChange={SwitchOnChange}
                      disabled={editInfo}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
      <div className="mt-12 flex justify-end space-x-7">
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
  // 控制 disabled
  const [editInfo, setEditInfo] = useState<boolean>(true);
  // Form
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
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
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value);
  };
  return (
    <>
      <div className="space-y-12 px-5 lg:mt-2">
        <div className="flex">
          <h3 className="mr-2 text-base font-bold text-secondary">
            專長領域 *
          </h3>
          <div className="space-x-3">
            <IButton
              text="職場議題"
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
            />
            <IButton
              text="伴侶關係"
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
            />
            <IButton
              text="人際關係"
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
            />
            <IButton
              text="負面情緒"
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
            />
            <IButton
              text="個人發展"
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
            />
            <IButton
              text="家庭議題"
              fontSize="text-[14px]"
              px="w-[104px] lg:w-[112px]"
              py="py-2 lg:py-[10px]"
            />
          </div>
        </div>
        <div className="flex">
          <h3 className="mr-2 font-bold text-secondary">課程方案 *</h3>
          <div className="rounded-2xl bg-gray-200 pb-9">
            <ul className="flex border-b border-gray-400  py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[33.33%]">專長領域</li>
              <li className="lg:w-[33.33%]">定價</li>
              <li className="lg:w-[33.33%]">是否開放</li>
            </ul>
            <ul className="space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
              <li className="flex flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#9E9E9E',
                      colorText: '#424242',
                      colorBorder: '#BDBDBD',
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
                    {/* 課程方案＋定價 */}
                    <div className="flex w-full flex-col space-y-4">
                      <div className="flex items-center">
                        <div className="lg:w-[33.33%]">1 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center">
                        <div className="lg:w-[33.33%]">3 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center">
                        <div className="lg:w-[33.33%]">5 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center">
                        <div className="lg:w-[33.33%]">體驗課 1 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
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
          <h3 className="mr-2 font-bold text-secondary">課程特色 *</h3>
          <div className="rounded-2xl bg-bg2 pb-9">
            <ul className="w-[804px] space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
              <li className="flex flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#9E9E9E',
                      colorText: '#424242',
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
                    <div className="mb-[33px] flex items-start px-[56px]">
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
                      className="mb-8 px-[56px]"
                      rules={[
                        {
                          required: true,
                          message: '此項為必填',
                          whitespace: true,
                        },
                      ]}
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
                      className="mb-8 px-[56px]"
                      rules={[
                        {
                          required: true,
                          message: '此項為必填',
                          whitespace: true,
                        },
                      ]}
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
                      className="mb-8 px-[56px]"
                      rules={[
                        {
                          required: true,
                          message: '此項為必填',
                          whitespace: true,
                        },
                      ]}
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
                      className="mb-8 px-[56px]"
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
                      className="mb-8 px-[56px]"
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
      <div className="mt-12 flex justify-end space-x-7">
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

function TimeInfo() {
  return (
    <div className="bg-bg2 rounded-lg border py-[42px] flex flex-col lg:flex-row">
      <div className="flex">
        <div>開始日期</div>
        <div>結束日期</div>
      </div>
      <div className="hidden lg:block ml-[60px] mr-[64px] w-[180px] bg-white">這是日期選單</div>
      <div className="border bg-white w-full lg:w-[594px] h-[473px]">這是日曆</div>
    </div>
  );
}

const counselorInfoTabAry = [
  {
    key: '基本資料',
    label: '基本資料',
    children: (
      <InfoForm
        name={conselor1.name}
        id={conselor1.id}
        LicenseNum={conselor1.LicenseNum}
        slogan={conselor1.slogan}
        introduce={conselor1.introduce}
        // counselorImage={conselor1.image}
      />
    ),
  },
  {
    key: '課程資訊',
    label: '課程資訊',
    children: <ClassInfo />,
  },
  {
    key: '預約時段',
    label: '預約時段',
    children: <TimeInfo />,
  },
];

// 控制右側選單函式
export default function CounselorInfoTab() {
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
        <Tabs
          defaultActiveKey="基本資料"
          items={counselorInfoTabAry}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}
