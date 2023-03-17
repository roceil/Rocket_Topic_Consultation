/* eslint-disable react/jsx-props-no-spreading */
// 待修改：
// PC 左側底圖高度 -> 無法自適應，目前自訂 css 算出 div 高度，試過 Footer 給 z-10，底圖給 -z-[99] 無效

import React, { useState } from 'react';
import {
  ConfigProvider, Button, Form, Input,
} from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const inputStyle = 'py-3 px-5 rounded-[24px]';

export default function LogIn() {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const formItemLayout = formLayout === 'vertical'
    ? { labelCol: { span: 24 }, wrapperCol: { offset: 0 } }
    : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
  };

  return (
    <>
      {/* PC 左側底圖 */}
      <div className="log-in-box-height-xl absolute -z-10 hidden w-[416px] bg-[#D4D2E3] lg:block" />
      <div className="container z-20 flex">
        {/* 圖片 */}
        <div className="my-[120px] ml-[58px] hidden h-[492px] w-[492px] rounded-[25px] bg-primary-light text-center lg:mr-[100px] lg:block xl:mr-[176px]">
          Image
        </div>
        {/* 右側輸入區 */}
        <div className="mb-[84px] max-w-[380px] lg:mt-[120px] lg:mb-[160px]">
          <div className="my-12 flex flex-col items-center lg:mt-0 lg:mb-12 lg:items-start">
            <p className="mb-1 hidden text-base font-bold text-primary-heavy lg:block">
              RESET PASSWORD
            </p>
            <h2>重設密碼</h2>
          </div>
          <div className="fle-col form form-reset flex max-w-[380px]">
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
                layout={formLayout}
                form={form}
                name="register-counselor"
                onFinish={onFinish}
                style={{
                  maxWidth: 380,
                }}
                className="space-y-8"
                labelAlign="left"
              >
                <Form.Item name="password" label="密碼 Password" hasFeedback>
                  <Input.Password
                    placeholder="Password"
                    className={inputStyle}
                  />
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
                        return Promise.reject(
                          new Error('與輸入的密碼不相符，請重新輸入'),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm password"
                    className={inputStyle}
                  />
                </Form.Item>
                {/* 推底下間距 */}
                <div className="h-5 lg:h-[64px]" />
                <Form.Item {...formItemLayout}>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    className="-mt-8 h-[56px] w-[380px] bg-[#D4D2E3] text-base text-white shadow-none"
                  >
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
