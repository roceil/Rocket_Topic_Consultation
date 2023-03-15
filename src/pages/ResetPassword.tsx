/* eslint-disable react/jsx-props-no-spreading */
// 待修改：
// PC 左側底圖高度 -> 無法自適應，目前自訂 css 算出 div 高度，試過 Footer 給 z-10，底圖給 -z-[99] 無效

import Link from 'next/link';
import React from 'react';
import {
  ConfigProvider,
  Button,
  Form,
  Input,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const inputStyle = 'py-3 px-5 rounded-[24px] mt-2';

export default function LogIn() {
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      {/* PC 左側底圖 */}
      <div className="hidden lg:block w-[416px] log-in-box-height-xl bg-[#D4D2E3] absolute -z-10" />
      <div className="z-20 container flex">
        {/* 圖片 */}
        <div className="hidden lg:block w-[492px] h-[492px] rounded-[25px] bg-primary-light xl:mr-[176px] lg:mr-[100px] my-[120px] ml-[58px] text-center">Image</div>
        {/* 右側輸入區 */}
        <div className="max-w-[380px] lg:mt-[120px] lg:mb-[160px] mb-[84px]">
          <div className="flex flex-col items-center my-12 lg:mt-0 lg:mb-12 lg:items-start">
            <p className="text-base text-primary-heavy font-bold mb-1 hidden lg:block">RESET PASSWORD</p>
            <h2>重設密碼</h2>
          </div>
          <div className="max-w-[380px] flex fle-col form form-reset">
            <ConfigProvider
              theme={{
                token: {
                  colorTextPlaceholder: '#5D5A88',
                  colorText: '#5D5A88',
                  colorBorder: '#D4D2E3',
                  colorIcon: '#5D5A88',

                },
                components: {
                  Button: {
                    colorPrimaryHover: '#5D5A88',
                    colorPrimaryActive: '#5D5A88',
                    colorText: '#5D5A88',
                    colorTextDisabled: '#fff',
                  },
                },
              }}
            >
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                className="space-y-8 max-w-[380px]"
              // layout="ant-col"
                labelAlign="left"
              >
                <Form.Item
                  name="password"
                  label="密碼 Password"
                  hasFeedback
                >
                  <Input.Password placeholder="Password" className={inputStyle}/>
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="再次輸入密碼 Confirm password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('與輸入的密碼不相符，請重新輸入'));
                      },
                    }),
                  ]}
                >
                  {/* 推間距 */}
                  <div className='h-2'></div>
                  <Input.Password placeholder='Confirm password' className={inputStyle}/>
                </Form.Item>
                {/* 推底下間距 */}
                <div className="h-5 lg:h-[64px]" />
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" shape="round" htmlType="submit" className="-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] text-base shadow-none">
                    重設密碼
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
