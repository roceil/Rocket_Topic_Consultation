// 待修改：
// PC 表單 文字＆輸入框 要換行排列-> <Form layout="ant-col"> 改得動但有紅字，估計 vercel 會報錯
// PC 表單格線有問題 -> 剩下諮商師 Upload 的位置調不動
// PC 左側底圖高度 -> 無法自適應，目前自訂 css 算出 div 高度，試過 Footer 給 z-10，底圖給 -z-[99] 無效

import Link from 'next/link';
import React from 'react';
import { ConfigProvider, Tabs, Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Upload} from 'antd';
import { BorderHorizontalOutlined, PlusCircleOutlined } from '@ant-design/icons'
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



export default function SignIn (){

  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
    <div className='flex justify-between'>
      <Form.Item
        name="Name"
        label="姓名 Name"
        rules={[
          {
            required: true,
            message: '請輸入姓名',
            whitespace: true,
          },
        ]}
        style={{width: 180}}
      >
        <Input placeholder='Name' className={inputStyle}/>
      </Form.Item>
      <Form.Item
        name="gender"
        label="性別 Sex"
        rules={[
          {
            required: true,
            message: '請選擇性別',
          },
        ]}
        style={{width: 180,}}
      >
        <Select placeholder="選擇性別">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="other">其他</Option>
        </Select>
      </Form.Item>
    </div>
  
    <Form.Item name="date-picker" label="出生年月日 Birth date" {...config}>
      <DatePicker className={inputStyle} style={{width: 380}} placeholder='Select date'/>
    </Form.Item>
  
    <Form.Item
      name="email"
      label="帳號 Account"
      rules={[
        {
          type: 'email',
          message: '請輸入 E-mail',
        },
        {
          required: true,
          message: '請輸入 E-mail',
        },
      ]}
      
    >
      <Input placeholder="Email address" className={inputStyle}/>
    </Form.Item>
  
    <Form.Item
      name="password"
      label="密碼 Password"
      rules={[
        {
          required: true,
          message: '請輸入密碼',
        },
      ]}
      hasFeedback
    >
      <Input.Password placeholder="Password" className={inputStyle}/>
      <p className='text-right'>須包含大小寫英文字母及數字</p>
    </Form.Item>
  
    <Form.Item
      name="confirm"
      label="再次輸入密碼 Confirm password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: '請再次輸入密碼',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password placeholder='Confirm password' className={inputStyle}/>
    </Form.Item>
    {/* 推底下間距 */}
    <div className='h-5'></div>
    <div className='flex justify-between items-end'>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
        我已同意 <a href="" className='underline'>隱私權條款</a>
        </Checkbox>
      </Form.Item>
      <div className='flex h-8 items-center'>
        <p>已成為會員？</p>
        <Link href ='#'>
          <p className='underline ml-2'>立即登入</p>
        </Link>
      </div>
    </div>
    <Form.Item {...tailFormItemLayout}>
      <Button type="default" htmlType="submit" className='-mt-8 bg-[#D4D2E3] text-white h-[56px] w-[380px] rounded-[30px] text-base '>
      立即註冊
      </Button>
    </Form.Item>
    </Form></>},
    {user: '諮商師',
    form:<><Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    style={{
      maxWidth: 380,
    }}
    className='space-y-8'
    layout="ant-col"
    labelAlign="left"
  >
    <div className='flex justify-between license'>
      <Form.Item
        name="Name"
        label="諮商師姓名 Name"
        rules={[
          {
            required: true,
            message: '請輸入姓名',
            whitespace: true,
          },
        ]}
        style={{width: 220,}}
      >
        <Input placeholder='Name' className={inputStyle}/>
      </Form.Item>
      <Form.Item
        name="upload"
        label="諮商師執照 License"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        
      >
        <Upload name="logo" action="/upload.do" listType="picture" style={{width: 220,}}>
          <Button icon={<PlusCircleOutlined />} >License</Button>
        </Upload>
      </Form.Item>
    </div>
    <Form.Item
      name="Name"
      label="諮商師證書字號 Certification No."
      rules={[
        {
          required: true,
          message: '請輸入諮商師證書字號 Certification No.',
          whitespace: true,
        },
      ]}
    >
      <Input placeholder='Certification No.' className={inputStyle}/>
    </Form.Item>
  
    <Form.Item
      name="email"
      label="帳號 Account"
      rules={[
        {
          type: 'email',
          message: '請輸入 E-mail',
        },
        {
          required: true,
          message: '請輸入 E-mail',
        },
      ]}
      
    >
      <Input placeholder="Email address" className={inputStyle}/>
    </Form.Item>
  
    <Form.Item
      name="password"
      label="密碼 Password"
      rules={[
        {
          required: true,
          message: '請輸入密碼',
        },
      ]}
      hasFeedback
    >
      <Input.Password placeholder="Password" className={inputStyle}/>
      <p className='text-right'>須包含大小寫英文字母及數字</p>
    </Form.Item>
  
    <Form.Item
      name="confirm"
      label="再次輸入密碼 Confirm password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: '請再次輸入密碼',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password placeholder='Confirm password' className={inputStyle}/>
    </Form.Item>
    {/* 推底下間距 */}
    <div className='h-5'></div>
    <div className='flex justify-between items-end'>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
        我已同意 <a href="" className='underline'>隱私權條款</a>
        </Checkbox>
      </Form.Item>
      <div className='flex h-8 items-center'>
        <p>已成為會員？</p>
        <Link href ='#'>
          <p className='underline ml-2'>立即登入</p>
        </Link>
      </div>
    </div>
    <Form.Item {...tailFormItemLayout}>
      <Button type="default" htmlType="submit" className='-mt-6 bg-[#D4D2E3] text-white h-[56px] w-[380px] rounded-[30px] text-base '>
      立即註冊
      </Button>
    </Form.Item>
    </Form></>}
  ]

  return(
    <>
    <div className='hidden lg:block w-[416px] box-height-xl bg-[#D4D2E3] absolute  -z-[99]'></div>
    {/* PC 左側底圖 */}
    <div className="z-20 container flex">
      {/* 圖片 */}
      <div className='hidden lg:block w-[492px] h-[492px] rounded-[25px] bg-primary-light mr-[176px] mt-[120px] ml-[58px] text-center'>Image</div>
      {/* 右側輸入區 */}
      <div className="max-w-[380px] lg:mt-[120px] lg:mb-[160px] mb-[84px]">
        <div className='flex flex-col items-center my-12 lg:mt-0 lg:mb-12 lg:items-start'>
          <p className='text-sm text-primary-heavy font-bold mb-1 hidden lg:block'>SIGN UP</p>
          <h2>會員註冊</h2>
        </div>
        <div className='max-w-[380px] flex fle-col '>
          <ConfigProvider
            theme={{
              token: {
                colorTextPlaceholder: '#5D5A88',
                colorPrimary: '#5D5A88', // Tab 被選取時的顏色 
                borderRadius: 24,
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
                }
              }
            }}
          >
            <Tabs
              defaultActiveKey="1"
              centered
              items={SignInAry.map((_, i) => {
                const id = String(i + 1);
                return {
                  label: `我是${_.user}`,
                  key: id,
                  children: _.form
                  
                };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
    </>
  )
}