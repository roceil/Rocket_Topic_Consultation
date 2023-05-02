import { ConfigProvider, Form, Input, Switch, Upload, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getCookie } from 'cookies-next';
import ResetPassWordModal from '@/common/components/ResetPassWordModal';
import CustomAlert from '@/common/helpers/customAlert';
import { ICounselorInfo, ICounselorInfoData, ICounselorInfoOnFinish } from '@/types/interface';
import { useCounselorInfoGetQuery, useCounselorInfoPutMutation, useCounselorUpdateImagePostApiMutation, useCounselorUploadHeadshotPostApiMutation } from '@/common/redux/service/counselorCenter';

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 諮商師 > 個人資料 > 基本資料
export function InfoForm() {
  const token = getCookie('auth');
  // ==================== 取得基本資料 API ====================
  const { data = {} as ICounselorInfo, isLoading } = useCounselorInfoGetQuery({ token });

  // ==================== 修改基本資料 API ====================
  const [CounselorInfoPutMutation] = useCounselorInfoPutMutation();

  // ==================== 更新/補傳 執照 API ====================
  const [counselorUpdateImagePostApi] = useCounselorUpdateImagePostApiMutation();

  // ==================== 更新/補傳 執照 API ====================
  const [counselorUploadHeadshotPostApi] = useCounselorUploadHeadshotPostApiMutation();

  // ==================== 儲存回傳資料 ====================
  const [renderData, setRenderData] = useState<ICounselorInfoData >(data || []);
  const [renderAccount, setRenderAccount] = useState<ICounselorInfoData >(data || []);
  const [renderIsVideoOpen, setRenderIsVideoOpen] = useState<boolean>();
  const [filelistheadshot, setfilelistheadshot] = useState<UploadFile[]>([]);
  const [filelistlic, setfilelistlic] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (data.Data && data.Data.length > 0) {
      setRenderData(data.Data[0]);
      setRenderAccount(data?.Data[0]?.Account);
      setRenderIsVideoOpen(() => data.Data[0].IsVideoOpen);

      setfilelistheadshot([
        {
          uid: '-1',
          name: 'Photo',
          status: 'done',
          url: data?.Data[0]?.Photo,
        },
      ]);
      setfilelistlic([{
        uid: '-1',
        name: 'Photo',
        status: 'done',
        url: data?.Data[0]?.LicenseImg,
      }]);
    }
  }, [data, isLoading]);

  // ==================== 重設密碼 ====================
  const [showResetPassword, setShowResetPassword] = useState(false);

  // ==================== 編輯 btn ====================
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isHidden = isDisabled
    ? '!opacity-0 transform duration-300'
    : '!opacity-100 transform duration-300';

  // ==================== alert Modal ====================
  const [modal, alertModal] = Modal.useModal();

  // ==================== Antd ====================
  const [form] = Form.useForm();

  // ==================== Upload 諮商師執照 ====================
  const LicenseImgUploadOnChange: UploadProps['onChange'] = ({
    fileList: newFilelist,
  }) => {
    setfilelistlic(newFilelist);
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

  // ==================== Upload 諮商師頭貼 ====================
  const HeadShotUploadOnChange: UploadProps['onChange'] = ({
    fileList: newFilelist,
  }) => {
    setfilelistheadshot(newFilelist);
  };

  const HeadShotOnPreview = async (file: UploadFile) => {
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

  // ==================== 允許上傳的文件大小（以字節為單位） ====================
  const allowedSize = 2 * 1024 * 1024; // 2MB

  // ==================== 定義上傳文件前的檢查函式 ====================
  const beforeUpload = (file: { size: number }) => {
    // 檢查文件大小是否符合要求
    const isAllowedSize = file.size <= allowedSize;
    if (!isAllowedSize) {
      const Message = '文件大小不超過 2MB';
      CustomAlert({ modal, Message, type: 'error' });
      return false;
    }
    return false;
  };

  // ==================== 送出表單 ====================
  const onFinish = async (values: ICounselorInfoOnFinish) => {
    const { CounselorName, SellingPoint, SelfIntroduction, VideoLink, IsVideoOpen, LicenseImg } = values;

    // 取出現有資源屬性值
    const updatedValues = {
      CounselorName: CounselorName ?? renderData.CounselorName,
      LicenseImg: LicenseImg ?? renderData.LicenseImg,
      SellingPoint: SellingPoint ?? renderData.SellingPoint,
      SelfIntroduction: SelfIntroduction ?? renderData.SelfIntroduction,
      VideoLink: VideoLink ?? renderData.VideoLink,
      IsVideoOpen: IsVideoOpen ?? renderData.IsVideoOpen,
    };

    // 提交更新後的文字POST
    const res = await CounselorInfoPutMutation({
      token,
      ...updatedValues,
    });
    setIsDisabled(true);
    if ('error' in res) {
      console.log('res:', res);
      const {
        data: { Message },
      } = res.error as { data: { Message: string } };
      CustomAlert({ modal, Message, type: 'error' });
    }

    // 圖片POST（執照）
    const updateImgRes = await counselorUpdateImagePostApi({
      file: !filelistlic[0].originFileObj ? [{
        uid: '-1',
        name: 'Photo',
        status: 'done',
        url: data?.Data[0]?.LicenseImg,
      }] : filelistlic[0].originFileObj,
      Account: renderAccount,
      token,
    });
    if ('error' in updateImgRes) {
      const { Message } = (updateImgRes.error as { data: { Message: string } }).data;
      console.log(Message);
    }

    // 圖片POST（頭貼）
    await counselorUploadHeadshotPostApi({
      file: filelistheadshot[0].originFileObj,
      Account: renderAccount,
      token,
    });
    const { Message } = (res as { data: { Message: string } }).data;
    CustomAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });
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
            onFinish={onFinish}
            style={{
              width: '100%',
            }}
            className="space-y-5"
            labelAlign="left"
          >
            <Form.Item
              label="重設密碼"
              className="font-bold lg:mx-[15px] lg:w-[124px]"
            >
              <div>
                <Button
                  className="font-normal"
                  block
                  style={{ height: 40, width: 124 }}
                  disabled={isDisabled}
                  onClick={() => {
                    setShowResetPassword(!showResetPassword);
                  }}
                >
                  點我重設密碼
                </Button>
                <ResetPassWordModal showResetPassword={showResetPassword} setShowResetPassword={setShowResetPassword} />
              </div>
            </Form.Item>
            <Form.Item
              name="CounselorName"
              label="會員姓名"
              className="font-bold lg:mx-[15px] lg:w-[584px]"
            >
              <Input
                disabled={isDisabled}
                placeholder={renderData.CounselorName}
                className="font-normal"
                style={{ height: 40 }}
              />
            </Form.Item>
            <div className="mt-5 space-y-[4.5px] text-gray-900 lg:mx-[15px]">
              <p className="text-sm font-bold ">諮商師證書字號</p>
              <p className="text-sm">{renderData.CertNumber}</p>
            </div>
            <Form.Item
              name="LicenseImg"
              label="諮商師執照"
              valuePropName="filelistlic"
              className="font-bold lg:mx-[15px]"
            >
              <div className="flex-row items-end lg:flex">
                <div>
                  <ImgCrop>
                    <Upload
                      action=""
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      accept="image/png,image/jpg"
                      listType="picture-card"
                      fileList={filelistlic}
                      onChange={LicenseImgUploadOnChange}
                      onPreview={LicenseImgOnPreview}
                      disabled={isDisabled}
                    >
                      {filelistlic.length < 1 && '+ Upload'}
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
              name="HeadShot"
              label="個人頭像"
              valuePropName="filelistheadshot"
              className="font-bold lg:mx-[15px]"
            >
              <div className="flex-row items-end lg:flex">
                <div>
                  <ImgCrop>
                    <Upload
                      action=""
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      accept="image/png,image/jpg"
                      listType="picture-card"
                      fileList={filelistheadshot}
                      onChange={HeadShotUploadOnChange}
                      onPreview={HeadShotOnPreview}
                      disabled={isDisabled}
                    >
                      {filelistheadshot.length < 1 && '+ Upload'}
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
                placeholder={renderData.SelfIntroduction ?? '您好！我是一位經驗豐富的諮商師，專門提供情緒支持、心理諮詢、人際關係建設等方面的服務。我擁有豐富的臨床經驗，並且持有心理學相關的學位和專業認證。我以富有同理心、耐心和關注每位來訪者的需求為信念，努力協助您渡過生命難關'}
                className="font-normal"
                disabled={isDisabled}
              />
            </Form.Item>
            <div className="lg:mx-[15px] pb-12 lg:border-b">
              <h3 className="mb-3 text-sm font-bold">介紹影片</h3>
              <div className="space-y-5 rounded-[10px] border border-[#D4D2E3] p-4 lg:w-[584px]">
                <Form.Item className="flex" name="VideoLink">
                  <div>
                    <p className="mr-4 w-[56px]">Youtube影片連結</p>
                    <Input
                      placeholder={renderData.VideoLink ?? '請輸入影片連結'}
                      className="bg-gray-200 h-10 w-[207px] border-none font-normal lg:w-[475px]"
                      disabled={isDisabled}
                    />
                  </div>
                </Form.Item>
                <Form.Item className="flex" name="IsVideoOpen" label="是否開放">
                  <Switch
                    disabled={isDisabled}
                    checked={renderIsVideoOpen}
                    onChange={() => setRenderIsVideoOpen(!renderIsVideoOpen)}
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
                  onClick={() => setIsDisabled(!isDisabled)}
                  className=" btnHoverDark w-[120px] lg:w-[180px] border-none text-[14px] font-bold text-white shadow-none lg:text-base h-[56px]"
                >
                  {isDisabled ? '編輯' : '取消編輯'}
                </Button>
              </div>
            </div>
          </Form>
        </ConfigProvider>
      </div>
      <div className="alert">{alertModal}</div>
    </div>
  );
}

