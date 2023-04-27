import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal, Upload } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { IButton } from '@/common/components/IButton';
import CustomHead from '@/common/components/CustomHead';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useResentLicensePostMutation } from '@/common/redux/service/resentLicense';
import customAlert from '@/common/helpers/customAlert';
import { loadingStatus } from '@/common/redux/feature/loading';
import useOpenLoading from '@/common/hooks/useOpenLoading';

export default function ResentLicense() {
  const [modal, alertModal] = Modal.useModal();
  const dispatch = useDispatch();
  const openLoading = useOpenLoading();
  const [form] = Form.useForm();

  // ==================== 上傳檔案陣列 ====================
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // ==================== 允許上傳的文件大小（以字節為單位） ====================
  const allowedSize = 2 * 1024 * 1024; // 2MB

  // ==================== 定義上傳文件前的檢查函式 ====================
  const beforeUpload = (file: { size: number }) => {
    // 檢查文件大小是否符合要求
    const isAllowedSize = file.size <= allowedSize;
    if (!isAllowedSize) {
      customAlert({ modal, Message: '文件大小不超過 2MB', type: 'error' });
      return false;
    }
    return false;
  };

  // ==================== 取得網址的 GUID ====================
  const router = useRouter();
  const { guid } = router.query;

  // ==================== 重新上傳 API ====================
  const [resentLicensePost] = useResentLicensePostMutation();
  const reUpload = async () => {
    openLoading();
    if (fileList.length === 0) {
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message: '請選擇要上傳的檔案', type: 'error' });
      return;
    }
    const uploadImgRes = await resentLicensePost({
      file: fileList[0].originFileObj,
      guid,
    });
    if ('error' in uploadImgRes) {
      const { Message } = (uploadImgRes.error as { data: { Message: string } })
        .data;
      dispatch(loadingStatus('none'));
      customAlert({ modal, Message, type: 'error' });
      return;
    }
    const { Message } = uploadImgRes.data as { Message: string };
    dispatch(loadingStatus('none'));
    customAlert({ modal, Message, type: 'success', contentKeyWord: '關閉' });
  };

  return (
    <>
      <CustomHead pageTitle="證書補件" />
      <section className="bg-white pb-28 pt-14 lg:min-h-[calc(100vh-110px)] lg:pb-[152px] lg:pt-[84px]">
        <div className="container text-center">
          <h2 className="relative mt-9 pb-3 lg:mt-[65px]">身份驗證中</h2>
          <div className="mt-12 rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px]">
            <p>身份驗證未通過，請在下方上傳補件資料</p>
          </div>

          {/* 電腦版 */}
          <Form
            form={form}
            className="hidden flex-row-reverse justify-center space-x-4 lg:flex"
          >
            <IButton
              text="上傳"
              fontSize="text-sm px-[26px] py-[7px]"
              extraStyle="h-[34px] ml-3"
              onClick={reUpload}
            />
            <Form.Item
              name="license"
              label="諮商師執照："
              className="uploadForm mt-5 max-w-[500px] text-gray-900 lg:mt-0 lg:max-w-none"
            >
              <ImgCrop rotationSlider aspect={580 / 389}>
                <Upload
                  action=""
                  fileList={fileList}
                  onChange={onChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  accept="image/png,image/jpg"
                  className="text-left"
                >
                  <div className="ml-4 space-x-3">
                    <IButton
                      text="選擇"
                      fontSize="text-sm px-[26px] py-[7px]"
                    />
                  </div>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form>

          {/* 手機版 */}
          <Form
            form={form}
            className=" uploadFormSM flex justify-center space-x-4 lg:hidden"
          >
            <Form.Item className="!mt-8">
              <ImgCrop rotationSlider aspect={580 / 389}>
                <Upload
                  action=""
                  fileList={fileList}
                  onChange={onChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  accept="image/png,image/jpg"
                >
                  <Button
                    className="reUploadBtn"
                    icon={
                      <PlusCircleOutlined className="text-xl text-secondary" />
                    }
                  >
                    License
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
            <IButton
              text="上傳"
              fontSize="text-sm px-[26px] py-[7px]"
              extraStyle="mt-8 h-[51px]"
              onClick={reUpload}
            />
          </Form>
        </div>
        <div className="alert">{alertModal}</div>
      </section>
    </>
  );
}
