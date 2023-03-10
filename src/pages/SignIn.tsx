import React from 'react';
import { ConfigProvider, Tabs, Button,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
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
      span: 16,
      offset: 8,
    },
  },
};

const inputStyle = 'py-3 px-5 rounded-[24px]';
// -----------------------



export default function SignIn (){

  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
  };


  return(
    <>
    <div className=" container w-screen flex justify-center my-12">
      <h2>會員註冊</h2>
    </div>
    <div className="container">
      <ConfigProvider
        theme={{
          token: {
            colorText: '#5D5A88', // Tab 文字顏色
            colorPrimary: '#5D5A88', // Tab 被選取時的顏色 
            borderRadius: 100,
            colorBgContainer:'#EEECFA',
            colorBorder: '#EEECFA',
            colorIcon: '#5D5A88',
            colorTextDescription: '#ff7f17'
          },
          components:{
            Checkbox:{
              colorBorder: '#EEECFA',
              borderRadius: 4
            }
          }
        }}
      >
        <Tabs
          defaultActiveKey="1"
          centered
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            const uesrAry = ['用戶', '諮商師']

            return {
              label: `我是${uesrAry}`,
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 380,
      }}
    >
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
        style={{width: 180,}}
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
        <Select placeholder="選擇性別" >
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="other">其他</Option>
        </Select>
      </Form.Item>

      <Form.Item name="date-picker" label="出生年月日 Birth date" {...config}>
        <DatePicker className={inputStyle} style={{width: 380,}}/>
      </Form.Item>

      <Form.Item
        name="email"
        label="帳號 Account"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
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
            message: 'Please input your password!',
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
            message: 'Please confirm your password!',
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
        我已同意 <a href="">隱私權條款</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="default" htmlType="submit" className='bg-primary-heavy text-white h-[56px] w-[380px] rounded-[30px] text-base '>
        立即註冊
        </Button>
      </Form.Item>
    </Form>


      </ConfigProvider>
    </div>
    </>
  )
}