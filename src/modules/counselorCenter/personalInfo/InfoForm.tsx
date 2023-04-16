import { ConfigProvider, Form, Input, Switch, Upload, Button } from 'antd';
import { useState } from 'react';
import { IButton } from '@/common/components/IButton';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

export interface CounselorProps {
  name: string;
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  LicenseNum: number;
  slogan: string;
  introduce: string;
}

// 諮商師 > 個人資料 > 基本資料
export function InfoForm({
  name,
  LicenseNum,
  slogan,
  introduce,
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

  const uploadOnChange: UploadProps['onChange'] = ({
    fileList: newFilelist,
  }) => {
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
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [form] = Form.useForm();

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
              layout="vertical"
              form={form}
              name="conselorCenter"
              onFinish={onFinish}
              style={{
                width: '100%',
              }}
              className="space-y-5"
              labelAlign="left"
            >
              <Form.Item
                name="重設密碼"
                label="重設密碼"
                className="font-bold lg:mx-[15px] lg:w-[124px]"
              >
                <Button
                  className="font-normal"
                  block
                  style={{ height: 40, width: 124 }}
                  disabled={isEdit}
                >
                  點我重設密碼
                </Button>
              </Form.Item>
              <Form.Item
                name="會員姓名"
                label="會員姓名"
                className="font-bold lg:mx-[15px] lg:w-[584px]"
              >
                <Input
                  disabled={isEdit}
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
                <div className="flex-row items-end lg:flex">
                  <div>
                    <ImgCrop>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={filelist}
                        onChange={uploadOnChange}
                        onPreview={onPreview}
                        disabled={isEdit}
                        id="CounselorLicense"
                      >
                        {filelist.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </div>
                  <p className="mx-2 mb-2 w-full text-sm font-normal text-gray-600">
                    建議上傳尺寸 640*640 且小於 2MB 的圖片
                  </p>
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
              layout="vertical"
              form={form}
              name="conselorCenter"
              onFinish={onFinish}
              style={{
                width: '100%',
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
                <div className="flex-row items-end lg:flex">
                  <div>
                    <ImgCrop>
                      <Upload
                        action=""
                        listType="picture-card"
                        fileList={filelist}
                        onChange={uploadOnChange}
                        onPreview={onPreview}
                        disabled={isEdit}
                        id="CounselorImage"
                      >
                        {filelist.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </div>
                  <p className="mx-2 mb-2 w-full text-sm font-normal text-gray-600">
                    建議上傳尺寸 640*640 且小於 2MB 的圖片
                  </p>
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
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                      disabled={isEdit}
                    />
                  </div>
                  <div className="flex">
                    <p className="mr-4 w-[56px]">是否開放</p>
                    <Switch
                      defaultChecked
                      onChange={SwitchOnChange}
                      disabled={isEdit}
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
          onClick={() => setIsEdit(false)}
        />
        {!isEdit && (
          <IButton
            text="儲存"
            fontSize="text-[14px] lg:text-base"
            px="px-[66px] lg:px-[74px]"
            py="py-4"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>
    </>
  );
}
