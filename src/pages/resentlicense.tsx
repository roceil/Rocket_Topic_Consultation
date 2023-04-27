import { useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Breadcrumb, Button, ConfigProvider, Form, Modal, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';
import useCloseLoading from '@/common/hooks/useCloseLoading';
import wrapper from '@/common/redux/store';
import { IShoppingCartProps } from '@/types/interface';
import customAlert from '@/common/helpers/customAlert';
import CustomHead from '@/common/components/CustomHead';
import useOpenLoading from '@/common/hooks/useOpenLoading';
import { IButton } from '@/common/components/IButton';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

export default function ResentLicense({ token, data: { Data } }: IShoppingCartProps) {
  const [modal, alertModal] = Modal.useModal();
  const dispatch = useDispatch();
  // =================== 關閉 loading ===================
  useCloseLoading();
  const openLoading = useOpenLoading();

  // ==================== Antd 表單 ====================
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  return (
    <>
      <CustomHead pageTitle="購物車" />
      <section className="bg-white pt-14 pb-28 lg:pt-[84px] lg:pb-[152px]">
        <div className="container text-center flex-col justify-center">
          <h2 className="relative mt-9 pb-3 lg:mt-[65px]">身份驗證中</h2>
          <div className="mt-12 rounded-full bg-primary-heavy py-[13px] text-center font-bold text-gray-900 lg:mb-[72px]">
            <p>身份驗證未通過，請在下方上傳補件資料</p>
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            className="flex justify-center space-x-4"
          >
            <Form.Item name="license" label="諮商師執照" className="text-gray-900 max-w-[500px]">
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 0 && '+ Upload'}
                  <Button className="border w-[400px] px-3  text-left">應該要顯示檔名</Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item>
              <div className="space-x-3">
                <IButton text="選擇" fontSize="text-sm px-[26px] py-[7px]" />
                <IButton text="上傳" fontSize="text-sm px-[26px] py-[7px]" />
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="alert">{alertModal}</div>
      </section>
    </>
  );
}
