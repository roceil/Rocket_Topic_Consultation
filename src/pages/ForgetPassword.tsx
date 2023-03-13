// 待修改：
// PC 表單 文字＆輸入框 要換行排列-> <Form layout="ant-col"> 改得動但有紅字，估計 vercel 會報錯
// PC 左側底圖高度 -> 無法自適應，目前自訂 css 算出 div 高度，試過 Footer 給 z-10，底圖給 -z-[99] 無效

import Link from 'next/link';
import React from 'react';
import { ConfigProvider, Tabs, Button,
  Checkbox,
  Form,
  Input,
  Select,
  Upload} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import Column from 'antd/es/table/Column';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
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

const inputStyle = 'py-3 px-5 rounded-[24px] ';




// -----------------------



export default function LogIn (){

  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  const SignInAry = [
    {user: '用戶',
    form: <><Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    className='space-y-8 max-w-[380px]'
    layout="ant-col"
    labelAlign="left"
  >
    <Form.Item
      name="email"
      label="帳號 Account"
    >
      <Input placeholder="Email address" className={inputStyle}/>
    </Form.Item>
  
    <Form.Item
      name="password"
      label="密碼 Password"
      hasFeedback
    >
      <Input.Password placeholder="Password" className={inputStyle}/>
      <p className='text-right underline'>忘記密碼？</p>
    </Form.Item>
    {/* 推底下間距 */}
    <div className='h-5'></div> 
    <div className='flex justify-between items-end'>
      <Form.Item className='flex items-end m-0'>
        <Checkbox>
        記住我
        </Checkbox>
      </Form.Item>
      <div className='flex h-8 items-center'>
        <p>尚未成為會員？</p>
        <Link href ='#'>
          <p className='underline ml-2'>立即註冊</p>
        </Link>
      </div>
    </div>
    <Form.Item {...tailFormItemLayout}>
      <Button type="default" htmlType="submit" className='-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] rounded-[30px] text-base '>
      登入
      </Button>
    </Form.Item>
    </Form></>},
    {user: '諮商師',
    form:<><Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    className='space-y-8 max-w-[380px]'
    layout="ant-col"
    labelAlign="left"
  >
    <Form.Item
      name="email"
      label="帳號 Account"
    >
      <Input placeholder="Email address" className={inputStyle}/>
      <p className='text-right'>請輸入註冊時使用的信箱</p>
    </Form.Item>
    {/* 推底下間距 */}
    <div className='h-5'></div> 
    <div className='flex justify-between items-end'>
      <div className='flex h-8 items-center'>
        <p>未收到信件？</p>
        <Link href ='#'>
          <p className='underline ml-2'>重新發送</p>
        </Link>
      </div>
    </div>
    <Form.Item {...tailFormItemLayout}>
      <Button type="default" htmlType="submit" className='-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] rounded-[30px] text-base '>
      登入
      </Button>
    </Form.Item>
    </Form></>}
  ]

  return(
    <>
    <div className='hidden lg:block w-[416px] log-in-box-height-xl bg-[#D4D2E3] absolute -z-10'></div>
    {/* PC 左側底圖 */}
    <div className="z-20 container flex">
      {/* 圖片 */}
      <div className='hidden lg:block w-[492px] h-[492px] rounded-[25px] bg-primary-light mr-[176px] my-[120px] ml-[58px] text-center'>Image</div>
      {/* 右側輸入區 */}
      <div className="max-w-[380px] lg:mt-[120px] lg:mb-[160px] mb-[84px]">
        <div className='flex flex-col items-center my-12 lg:mt-0 lg:mb-12 lg:items-start'>
          <p className='text-base text-primary-heavy font-bold mb-1 hidden lg:block'>FORGET PASSWORD</p>
          <h2>忘記密碼</h2>
        </div>
        <div className='max-w-[380px] flex fle-col '>
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: '#5D5A88',
                colorPrimary: '#5D5A88', // Tab 被選取時的顏色 
                // borderRadius: 24,
                colorText: '#5D5A88',
                colorIcon: '#5D5A88',
                colorTextDescription: '#ff7f17',
                colorBorder: '#D4D2E3'
              },
              components:{
                Tabs:{
                  colorText: '#D4D2E3',
                  borderRadius: 4
                },
                Select:{
                  controlHeight: 48
                },
                Checkbox:{
                  borderRadius: 0,
                }
              }
            }}
          >
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              className='space-y-8 max-w-[380px]'
              layout="ant-col"
              labelAlign="left"
            >
              <Form.Item
                name="email"
                label="信箱 Email Address"
              >
                <Input placeholder="Email address" className={inputStyle}/>
                <p className='text-right'>請輸入註冊時使用的信箱</p>
              </Form.Item>
              {/* 推底下間距 */}
              <div className='h-5'></div> 
              <div className='flex justify-between items-end'>
                <div className='flex h-8 items-center'>
                  <p>未收到信件？</p>
                  <Link href ='#'>
                    <p className='underline ml-2'>重新發送</p>
                  </Link>
                </div>
              </div>
              <Form.Item {...tailFormItemLayout}>
                <Button type="default" htmlType="submit" className='-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] rounded-[30px] text-base '>
                登入
                </Button>
              </Form.Item>
              </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
    </>
  )
}