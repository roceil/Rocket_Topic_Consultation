import { ConfigProvider, Form, Input, Switch, Upload, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getCookie } from 'cookies-next';
import { ICounselorInfo, ICounselorInfoData } from '../../../types/interface';
import { useCounselorInfoGetQuery, useCounselorInfoPutMutation } from '../../../common/redux/service/counselorCenter';

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 諮商師 > 個人資料 > 基本資料
export function InfoForm() {
  const token = getCookie('auth');
  // ==================== 取得基本資料 API ====================
  const { data = {} as ICounselorInfo, isLoading } = useCounselorInfoGetQuery({ token });

  // ==================== 修改基本資料 API ====================
  const [CounselorInfoPutMutation] = useCounselorInfoPutMutation();

  // ==================== 儲存回傳資料 ====================
  const [renderData, setRenderData] = useState<ICounselorInfoData >(data || []);
  useEffect(() => {
    if (data.Data && data.Data.length > 0) {
      setRenderData(data.Data[0]);
    }
  }, [data, isLoading]);

  // ==================== 編輯 btn ====================
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  // ==================== Antd ====================
  const [form] = Form.useForm();
  // Upload 諮商師執照＆頭貼圖檔
  const [filelist, setFilelist] = useState<UploadFile[]>([
    { // 圖片要改成 base64，才能符合 antd Img src=
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const LicenseImgUploadOnChange: UploadProps['onChange'] = ({
    fileList: newFilelist,
  }) => {
    setFilelist(newFilelist);
  };
  const PhotoUploadOnChange: UploadProps['onChange'] = ({
    fileList: newFilelist,
  }) => {
    setFilelist(newFilelist);
  };
  const LicenseImgOnPreview = async (file: UploadFile) => {
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
  const PhotoOnPreview = async (file: UploadFile) => {
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

  // ==================== 送出表單 ====================
  const onFinish = async (values: any) => {
    console.log(values);

    // 取出現有資源屬性值
    const currentValues = renderData;

    // 更新需要更新的屬性值，並將其他屬性值保持不變
    const updatedValues = {
      ...currentValues,
      ...(values.Name && { Name: values.Name }),
      ...(values.SellingPoint && { SellingPoint: values.SellingPoint }),
      ...(values.SelfIntroduction && { SelfIntroduction: values.SelfIntroduction }),
      ...(values.VideoLink && { VideoLink: values.VideoLink }),
      ...(values.IsVideoOpen !== undefined && { IsVideoOpen: values.IsVideoOpen }),
    };

    // 提交更新後的完整資源內容
    const res = await CounselorInfoPutMutation({
      token,
      ...updatedValues,
    });

    setIsDisabled(true);
    console.log(res);
    // alert(res.data.Message);
  };

  return (
    <div className="w-full space-y-12 px-4 pb-12">
      <div className="space-y-5">
        <div className="rounded-lg bg-primary py-2 text-center text-base font-bold">
          <h3 className="text-gray-900">會員資料</h3>
        </div>
        <div className="space-y-[4.5px] text-gray-900 lg:mx-[15px]">
          <p className="text-sm font-bold ">會員帳號</p>
          <p className="text-sm">{renderData.Account}</p>
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
                disabled={isDisabled}
              >
                點我重設密碼
              </Button>
            </Form.Item>
            <Form.Item
              name="Name"
              label="會員姓名"
              className="font-bold lg:mx-[15px] lg:w-[584px]"
            >
              <Input
                disabled={isDisabled}
                placeholder={renderData.CounselorName}
                className="font-normal"
                style={{ height: 40 }}
                value={renderData.CounselorName}
              />
            </Form.Item>
            <div className="mt-5 space-y-[4.5px] text-gray-900 lg:mx-[15px]">
              <p className="text-sm font-bold ">諮商師證書字號</p>
              <p className="text-sm">{renderData.CertNumber}</p>
            </div>
            <Form.Item
              name="LicenseImg"
              label="諮商師執照"
              valuePropName="filelist"
                // getValueFromEvent={normFile}
              className="font-bold lg:mx-[15px]"
            >
              <div className="flex-row items-end lg:flex">
                <div>
                  <ImgCrop>
                    <Upload
                        // action=""
                      listType="picture-card"
                      fileList={filelist}
                      onChange={LicenseImgUploadOnChange} // 不同 function
                      onPreview={LicenseImgOnPreview} // 不同 function
                      disabled={isDisabled}
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
            <div className="rounded-lg bg-primary text-center">
              <h3 className="py-2 text-base font-bold text-gray-900">個人簡介</h3>
            </div>
            <Form.Item
              name="Photo"
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
                      onChange={PhotoUploadOnChange}
                      onPreview={PhotoOnPreview}
                      disabled={isDisabled}
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
              name="SellingPoint"
              label="個人賣點"
              className="font-bold lg:mx-[15px] lg:w-[584px]"
            >
              <TextArea
                showCount
                maxLength={12}
                style={{ height: 40, resize: 'none' }}
                onChange={onChange}
                placeholder={renderData.SellingPoint ?? '您的諮商年資、特殊經歷等...'}
                className="font-normal"
                disabled={isDisabled}
              />
            </Form.Item>
            <Form.Item
              name="SelfIntroduction"
              label="自我介紹"
              className="font-bold lg:mx-[15px] lg:w-[584px]"
            >
              <TextArea
                showCount
                maxLength={100}
                style={{ height: 180, marginBottom: 4 }}
                onChange={onChange}
                placeholder={renderData.SelfIntroduction ?? '您好！我是一位經驗豐富的諮商師，專門提供情緒支持、心理諮詢、人際關係建設等方面的服務。我擁有豐富的臨床經驗，並且持有心理學相關的學位和專業認證。我以富有同理心、耐心和關注每位來訪者的需求為信念，努力協助您渡過生命難關'}
                className="font-normal"
                disabled={isDisabled}
              />
            </Form.Item>
            <div className="lg:mx-[15px] pb-12 lg:border-b">
              <h3 className="mb-3 text-sm font-bold">介紹影片</h3>
              <div className="space-y-5 rounded-[10px] border border-[#D4D2E3] p-4 lg:w-[584px]">
                <Form.Item className="flex" name="VideoLink">
                  <p className="mr-4 w-[56px]">Youtube影片連結</p>
                  <Input
                    placeholder={renderData.VideoLink ?? '請輸入影片連結'}
                    className="bg-gray-200 h-10 w-[207px] border-none font-normal lg:w-[475px]"
                    disabled={isDisabled}
                  />
                </Form.Item>
                <Form.Item className="flex" name="IsVideoOpen">
                  <p className="mr-4 w-[56px]">是否開放</p>
                  <Switch
                    defaultChecked={renderData.IsVideoOpen}
                    onChange={SwitchOnChange}
                    disabled={isDisabled}
                    className="bg-gray-400"
                  />
                </Form.Item>
              </div>
            </div>
            {/* btns */}
            <div className="flex justify-end">
              <div className="space-x-5 mt-5">
                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  className={`btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px] ${isHidden}`}
                >
                  儲存
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="button"
                  onClick={() => setIsDisabled(false)}
                  className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
                >
                  {isDisabled ? '編輯' : '取消編輯'}
                </Button>
              </div>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
