/* eslint-disable react/jsx-props-no-spreading */
import Image from 'next/image';
import { Button, ConfigProvider, Form, Input, Tabs, Upload, message, Switch, Select } from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import user from '../../public/images/user.svg';
import profile from '../../public/images/profile.svg';
import edit from '../../public/images/Edit.svg';
import right from '../../public/images/Right.svg';
import { darkBtn, IButton, lightBtn, lightBtn2 } from '../common/components/IButton';






function ClassInfo() {
  // 控制『專長領域』樣式
  const [BtnState, setBtnState] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
    btn6: false,
  });
  // 控制 disabled
  const [editInfo, setEditInfo] = useState<boolean>(true);
  // Form
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  // Switch
  const SwitchOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  // 下拉選單
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // 課程特色
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };
  return (
    <>
      <div className="space-y-12 lg:mt-2 lg:px-5">
        <div className="flex flex-col lg:flex-row">
          <h3 className="mr-2 mb-5 font-bold">專長領域 *</h3>
          <div className="flex flex-wrap justify-around lg:flex-nowrap lg:justify-between lg:space-x-3">
            <IButton
              text="一般成人"
              bgColor={BtnState.btn1 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base font-normal lg:font-bold mb-3 lg:mb-0"
              px="w-[104px] lg:w-[112px]"
              py="h-9 lg:h-10"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn1: !BtnState.btn1,
                });
              }}
            />
            <IButton
              text="親密關係"
              bgColor={BtnState.btn2 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base font-normal lg:font-bold mb-3 lg:mb-0"
              px="w-[104px] lg:w-[112px]"
              py="h-9 lg:h-10"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn2: !BtnState.btn2,
                });
              }}
            />
            <IButton
              text="青少年"
              bgColor={BtnState.btn3 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base font-normal lg:font-bold mb-3 lg:mb-0"
              px="w-[104px] lg:w-[112px]"
              py="h-9 lg:h-10"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn3: !BtnState.btn3,
                });
              }}
            />
            <IButton
              text="女性議題"
              bgColor={BtnState.btn4 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base font-normal lg:font-bold mb-3 lg:mb-0"
              px="w-[104px] lg:w-[112px]"
              py="h-9 lg:h-10"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn4: !BtnState.btn4,
                });
              }}
            />
            <IButton
              text="PTSD"
              bgColor={BtnState.btn5 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base font-normal lg:font-bold mb-3 lg:mb-0"
              px="w-[104px] lg:w-[112px]"
              py="h-9 lg:h-10"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn5: !BtnState.btn5,
                });
              }}
            />
            <IButton
              text="中老年議題"
              bgColor={BtnState.btn6 ? lightBtn2 : lightBtn}
              fontSize="text-[14px] lg:text-base font-normal lg:font-bold mb-3 lg:mb-0"
              px="w-[104px] lg:w-[112px]"
              py="h-9 lg:h-10"
              onClick={() => {
                setBtnState({
                  ...BtnState,
                  btn6: !BtnState.btn6,
                });
              }}
            />
          </div>
          <p className="ml-4 mt-7 hidden text-sm lg:block">可複選</p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <h3 className="mr-2 mb-5 font-bold">課程方案 *</h3>
          {/* Mobile 課程方案下拉選單 */}
          <div className="mb-5 w-[108px] lg:hidden">
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#5D5A88',
                  colorBorder: '#D4D2E3',
                  fontSize: 14,
                  borderRadius: 10,
                  controlHeight: 40,
                },
              }}
            >
              <Select
                disabled={editInfo}
                defaultValue="一般成人"
                onChange={handleChange}
                options={[
                  { value: '一般成人', label: '一般成人' },
                  { value: '親密關係', label: '親密關係' },
                  { value: '青少年', label: '青少年' },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="rounded-2xl bg-bg2 pb-8">
            <ul className="flex border-b border-secondary  py-5 text-center text-sm font-bold text-primary-heavy lg:w-[804px] lg:px-0 ">
              <li className="hidden lg:block lg:w-[25%]">專長領域</li>
              <li className="w-[33.33%] lg:hidden">方案類型</li>
              <li className="hidden lg:block lg:w-[25%]">課程方案</li>
              <li className="w-[33.33%] lg:w-[25%]">定價</li>
              <li className="w-[33.33%] lg:w-[25%]">是否開放</li>
            </ul>
            {/* PC 課程方案表格 */}
            <ul className="hidden space-y-4 px-3 pt-[22px] lg:block lg:w-[804px] lg:px-0">
              <li className="flex flex-col items-center space-x-10 rounded-lg text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#5D5A88',
                      colorText: '#5D5A88',
                      colorBorder: '#D4D2E3',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  <Form
                    form={form}
                    name="classInfo"
                    onFinish={onFinish}
                    style={{ width: 804, display: 'flex' }}
                  >
                    <div className="lg:w-[25%]">
                      <Select
                        disabled={editInfo}
                        defaultValue="一般成人"
                        style={{ width: 108 }}
                        onChange={handleChange}
                        options={[
                          { value: '一般成人', label: '一般成人' },
                          { value: '親密關係', label: '親密關係' },
                          { value: '青少年', label: '青少年' },
                        ]}
                      />
                    </div>
                    {/* 課程方案＋定價 */}
                    <div className="flex flex-col space-y-4">
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">1 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">3 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">5 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex w-[603px] items-center">
                        <div className="lg:w-[33.33%]">體驗課 1 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </ConfigProvider>
              </li>
            </ul>
            {/* Mobile 課程方案表格 */}
            <ul className="flex flex-col space-y-4 pt-5 lg:hidden ">
              <li className="items-center space-x-10 rounded-lg text-sm text-primary-heavy">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#5D5A88',
                      colorText: '#5D5A88',
                      colorBorder: '#D4D2E3',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  <Form form={form} name="classInfo" onFinish={onFinish}>
                    {/* 課程方案＋定價 */}
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-[33.33%] text-center">1 堂</div>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 96 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-[33.33%] text-center">3 堂</div>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 96 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-[33.33%] text-center">5 堂</div>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 96 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-[33.33%] text-center">
                          <p className="ml-7 w-[42px]">體驗課 1 堂</p>
                        </div>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 96 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 w-[33.33%] text-center">
                          <Switch defaultChecked onChange={SwitchOnChange} disabled={editInfo} />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </ConfigProvider>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <h3 className="mr-2 mb-5 font-bold">課程特色 *</h3>
          {/* Mobile 課程特色下拉選單 */}
          <div className="mb-5 flex items-center space-x-[9px] lg:hidden">
            <p>專長領域</p>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#5D5A88',
                  colorBorder: '#D4D2E3',
                  fontSize: 14,
                  borderRadius: 10,
                  controlHeight: 40,
                },
              }}
            >
              <Select
                disabled={editInfo}
                defaultValue="一般成人"
                onChange={handleChange}
                options={[
                  { value: '一般成人', label: '一般成人' },
                  { value: '親密關係', label: '親密關係' },
                  { value: '青少年', label: '青少年' },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="rounded-2xl bg-bg2 lg:pb-8">
            <ul className="w-full space-y-4 lg:pt-5">
              <li className="flex flex-col items-center rounded-lg py-5 text-sm text-primary-heavy lg:space-x-10 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#5D5A88',
                      colorText: '#5D5A88',
                      colorBorder: '#D4D2E3',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  {/* PC 課程特色 textarea */}
                  <div className="hidden lg:block">
                    <Form form={form} name="classInfo" onFinish={onFinish} style={{ width: 804 }}>
                      <div className="mb-[33px] flex items-center pl-[56px]">
                        <Select
                          disabled={editInfo}
                          defaultValue="一般成人"
                          style={{ width: 108 }}
                          onChange={handleChange}
                          options={[
                            { value: '一般成人', label: '一般成人' },
                            { value: '親密關係', label: '親密關係' },
                            { value: '青少年', label: '青少年' },
                          ]}
                        />
                      </div>
                      {/* 課程方案＋定價 */}
                      <Form.Item
                        name="特色 1"
                        label="特色 1"
                        className="mb-8 px-5 lg:px-[56px]"
                        rules={[
                          {
                            required: true,
                            message: '此項為必填',
                            whitespace: true,
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 45, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item
                        name="特色 2"
                        label="特色 2"
                        className="mb-8 px-5 lg:px-[56px]"
                        rules={[
                          {
                            required: true,
                            message: '此項為必填',
                            whitespace: true,
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 45, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item
                        name="特色 3"
                        label="特色 3"
                        className="mb-8 px-5 lg:px-[56px]"
                        rules={[
                          {
                            required: true,
                            message: '此項為必填',
                            whitespace: true,
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 45, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item name="特色 4" label="特色 4" className="mb-8 px-5 lg:px-[56px]">
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 45, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item name="特色 5" label="特色 5" className="mb-8 px-5 lg:px-[56px]">
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 45, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                  {/* Mobile 課程特色 textarea */}
                  <div className="class-info w-full px-5 lg:hidden">
                    <Form form={form} name="classInfo" onFinish={onFinish}>
                      {/* 課程方案＋定價 */}
                      <Form.Item
                        name="特色 1"
                        label="特色 1"
                        className="mb-8"
                        rules={[
                          {
                            required: true,
                            message: '此項為必填',
                            whitespace: true,
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 69, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item
                        name="特色 2"
                        label="特色 2"
                        className="mb-8"
                        rules={[
                          {
                            required: true,
                            message: '此項為必填',
                            whitespace: true,
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 69, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item
                        name="特色 3"
                        label="特色 3"
                        className="mb-8"
                        rules={[
                          {
                            required: true,
                            message: '此項為必填',
                            whitespace: true,
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 69, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item name="特色 4" label="特色 4" className="mb-8">
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 69, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                      <Form.Item name="特色 5" label="特色 5" className="mb-8">
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 69, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </ConfigProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-end space-x-7">
        <IButton
          text="編輯"
          bgColor={lightBtn}
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
          onClick={() => setEditInfo(false)}
        />
        {!editInfo && (
          <IButton
            text="儲存"
            bgColor={darkBtn}
            fontSize="text-[14px] lg:text-base"
            px="px-[66px] lg:px-[74px]"
            py="py-4"
          />
        )}
      </div>
    </>
  );
}






function CounselorWaitReply() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex w-[624px] border-b border-secondary  py-5 pl-[29px] text-sm font-bold text-primary-heavy lg:w-auto lg:px-0 lg:text-center">
        <li className="lg:w-[17.5889%] lg:pl-[87px] lg:text-left">個案姓名</li>
        <li className="ml-[33px] lg:ml-0 lg:w-[16.996%]">諮商議題</li>
        <li className="ml-[57px] lg:ml-0  lg:w-[17.7865%]">諮商日期</li>
        <li className="ml-[47px] lg:ml-0  lg:w-[14.4268%]">諮商時間</li>
        <li className="ml-[72px] lg:ml-0  lg:w-[33.2015%] lg:pl-[100px] lg:text-left">
          確認預約時段
        </li>
      </ul>

      <ul className="w-[624px] space-y-4 px-3 pt-5 lg:w-auto lg:px-7 lg:pt-7">
        <li className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
          <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">哈哈哈</div>

          <div className="lg:w-[16.3179%]">一般成人</div>

          <div className="lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="lg:w-[13.9121%]">09:00</div>

          <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              我想更改時段
            </button>

            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>

        <li className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
          <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">哈哈哈</div>

          <div className="lg:w-[16.3179%]">一般成人</div>

          <div className="lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="lg:w-[13.9121%]">09:00</div>

          <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              我想更改時段
            </button>

            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>

        <li className="flex  items-center space-x-10 rounded-lg bg-white py-5 px-4 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
          <div className="lg:w-[16.5271%] lg:pl-[64px] lg:text-left">哈哈哈</div>

          <div className="lg:w-[16.3179%]">一般成人</div>

          <div className="lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="lg:w-[13.9121%]">09:00</div>

          <div className=" flex space-x-2 text-xs lg:w-[32.8451%] lg:space-x-3 lg:pl-[46px] lg:text-left lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              我想更改時段
            </button>

            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}



function CounselorHasSetUp() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex w-[761px] border-b border-secondary  py-5 pl-[29px] text-center text-sm font-bold text-primary-heavy lg:w-auto lg:px-0">
        <li className="w-[15.2631%] lg:w-[17.0498%] lg:pl-[76px] lg:text-left">個案姓名</li>
        <li className="w-[15.2631%] lg:w-[14.1762%]">諮商議題</li>
        <li className="w-[15.2631%] lg:w-[19.5402%]">諮商日期</li>
        <li className="w-[15.2631%] lg:w-[11.6858%]">諮商時間</li>
        <li className="w-[22.7332%] lg:w-[17.1455%]">加入Google日曆</li>
        <li className="w-[16.2943%] pl-[20px] text-left lg:w-[17.3371%] lg:pl-[55px]">個案記錄</li>
      </ul>

      <ul className="w-[761px] space-y-4 px-4 pt-5 lg:w-auto lg:px-7 lg:pt-7">
        <li className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-primary-heavy lg:text-base">
          <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">哈哈哈</div>

          <div className="w-[20.6611%] lg:w-[16.3179%]">一般成人</div>

          <div className="w-[13.3966%] lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="w-[20.11%] lg:w-[13.9121%]">09:00</div>

          <div className="w-[18.1818%] lg:w-[16.7364%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              加入
            </button>
          </div>

          <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
        <li className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-primary-heavy lg:text-base">
          <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">哈哈哈</div>

          <div className="w-[20.6611%] lg:w-[16.3179%]">一般成人</div>

          <div className="w-[13.3966%] lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="w-[20.11%] lg:w-[13.9121%]">09:00</div>

          <div className="w-[18.1818%] lg:w-[16.7364%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              加入
            </button>
          </div>

          <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
        <li className="flex items-center  rounded-lg bg-white py-5 px-4 text-center text-sm text-primary-heavy lg:text-base">
          <div className="w-[11.2947%] lg:w-[15.2719%] lg:pl-[52px] lg:text-left">哈哈哈</div>

          <div className="w-[20.6611%] lg:w-[16.3179%]">一般成人</div>

          <div className="w-[13.3966%] lg:w-[20.3974%]">2023 / 03 / 05</div>

          <div className="w-[20.11%] lg:w-[13.9121%]">09:00</div>

          <div className="w-[18.1818%] lg:w-[16.7364%]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              加入
            </button>
          </div>

          <div className="w-[17.3553%] pl-[50px] text-left lg:w-[17.364%] lg:pl-[46px]">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              接受
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

function CounselorHasCancel() {
  return (
    <div className="overflow-x-auto rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex w-[588px] border-b border-secondary  py-5  px-[17px] text-center text-sm font-bold text-primary-heavy lg:w-auto lg:px-7 lg:text-center">
        <li className="w-[20.1438%]">個案姓名</li>
        <li className="w-[20.1438%]">諮商議題</li>
        <li className="w-[20.1438%]">諮商日期</li>
        <li className="w-[20.1438%]">諮商時間</li>
        <li className="w-[19.4244%]">個案記錄</li>
      </ul>

      <ul className="w-[588px] space-y-4 px-[17px] pt-5 lg:w-auto lg:px-7 lg:pt-7">
        <li className="flex items-center rounded-lg bg-white py-5 text-center text-sm text-primary-heavy lg:space-x-0 lg:text-base">
          <div className="w-[20.1438%]">哈哈哈</div>

          <div className="w-[20.1438%]">一般成人</div>

          <div className="w-[20.1438%]">2023 / 03 / 05</div>

          <div className="w-[20.1438%]">09:00</div>

          <div className="flex w-[19.4244%] justify-center text-xs lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              查看
            </button>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white py-5 text-center text-sm text-primary-heavy lg:space-x-0 lg:text-base">
          <div className="w-[20.1438%]">哈哈哈</div>

          <div className="w-[20.1438%]">一般成人</div>

          <div className="w-[20.1438%]">2023 / 03 / 05</div>

          <div className="w-[20.1438%]">09:00</div>

          <div className="flex w-[19.4244%] justify-center text-xs lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              查看
            </button>
          </div>
        </li>

        <li className="flex items-center rounded-lg bg-white py-5 text-center text-sm text-primary-heavy lg:space-x-0 lg:text-base">
          <div className="w-[20.1438%]">哈哈哈</div>

          <div className="w-[20.1438%]">一般成人</div>

          <div className="w-[20.1438%]">2023 / 03 / 05</div>

          <div className="w-[20.1438%]">09:00</div>

          <div className="flex w-[19.4244%] justify-center text-xs lg:text-sm">
            <button
              type="button"
              className="rounded-full border border-primary-heavy py-1 px-4 lg:py-2 lg:px-5"
            >
              查看
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

const counselorReservationTabAry = [
  {
    key: '待回覆',
    label: <p className="font-bold">待回覆</p>,
    children: <CounselorWaitReply />,
  },
  {
    key: '已成立',
    label: <p className="font-bold">已成立</p>,
    children: <CounselorHasSetUp />,
  },
  {
    key: '已取消',
    label: <p className="font-bold">已取消</p>,
    children: <CounselorHasCancel />,
  },
];

function CounselorReservationTab() {
  return (
    <div className="counselorTab lg:mt-[-60px]">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#767494',
            colorText: '#767494',
            fontSize: 16,
            margin: 32,
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={counselorReservationTabAry} onChange={onChange} />
      </ConfigProvider>
    </div>
  );
}

function CounselorCaseRecord() {
  return (
    <div className="rounded-2xl bg-bg2 pb-9 lg:pb-12">
      <ul className="flex border-b border-secondary py-5 px-5 text-center text-sm font-bold text-primary-heavy">
        <li className="w-[44.1176%]">個案記錄</li>
        <li className="w-[44.1176%]">記錄筆數</li>
        <li className="w-[11.7647%]" />
      </ul>

      <ul className=" space-y-4 px-5 pt-5">
        <li className="w-full">
          <button
            type="button"
            className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy"
          >
            <div className="w-[44.1176%]">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="https://fakeimg.pl/40x40/EEECFA/"
                  alt="user_pic"
                  className="rounded-full"
                />
                <p>哈哈哈</p>
              </div>
            </div>

            <div className="w-[44.1176%] lg:w-[16.3179%]">5筆</div>

            <div className="flex w-[11.7647%] justify-center lg:w-[17.364%] lg:pl-[46px]">
              <Image src={right} width={16} height={16} alt="icons" />
            </div>
          </button>
        </li>

        <li className="w-full">
          <button
            type="button"
            className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy"
          >
            <div className="w-[44.1176%]">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="https://fakeimg.pl/40x40/EEECFA/"
                  alt="user_pic"
                  className="rounded-full"
                />
                <p>哈哈哈</p>
              </div>
            </div>

            <div className="w-[44.1176%] lg:w-[16.3179%]">5筆</div>

            <div className="flex w-[11.7647%] justify-center lg:w-[17.364%] lg:pl-[46px]">
              <Image src={right} width={16} height={16} alt="icons" />
            </div>
          </button>
        </li>

        <li className="w-full">
          <button
            type="button"
            className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy"
          >
            <div className="w-[44.1176%]">
              <div className="flex items-center justify-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="https://fakeimg.pl/40x40/EEECFA/"
                  alt="user_pic"
                  className="rounded-full"
                />
                <p>哈哈哈</p>
              </div>
            </div>

            <div className="w-[44.1176%] lg:w-[16.3179%]">5筆</div>

            <div className="flex w-[11.7647%] justify-center lg:w-[17.364%] lg:pl-[46px]">
              <Image src={right} width={16} height={16} alt="icons" />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}

function CounselorCaseRecordPC() {
  return (
    <div className="mt-[-60px]">
      {/* 搜尋框 */}
      <div className="mb-6 w-full max-w-[200px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#5D5A88',
              borderRadius: 9999,
              colorTextPlaceholder: '#5D5A88',
              // colorText: colorPrimary,
              colorBgContainer: '#EEECFA', // controlOutline: colorPrimary,
            },
          }}
        >
          <Input
            placeholder="輸入個案姓名"
            suffix={<SearchOutlined className="text-[#5D5A88]" />}
            className="border-none px-5 py-1 "
          />
        </ConfigProvider>
      </div>

      <div className="flex justify-between space-x-[60px] rounded-2xl bg-bg2 pb-9 lg:px-8 lg:pb-12">
        <div className="w-[278px] ">
          <ul className="flex border-b border-secondary py-6 text-center font-bold">
            <li className="w-[44.1176%]">個案記錄</li>
            <li className="w-[44.1176%]">記錄筆數</li>
            <li className="w-[11.7647%]" />
          </ul>

          <ul className=" space-y-4 pt-5">
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-[278px] ">
          <ul className="flex border-b border-secondary py-6 text-center font-bold">
            <li className="w-[44.1176%]">個案記錄</li>
            <li className="w-[44.1176%]">記錄筆數</li>
            <li className="w-[11.7647%]" />
          </ul>

          <ul className=" space-y-4 pt-5">
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-[278px] ">
          <ul className="flex border-b border-secondary py-6 text-center font-bold">
            <li className="w-[44.1176%]">個案記錄</li>
            <li className="w-[44.1176%]">記錄筆數</li>
            <li className="w-[11.7647%]" />
          </ul>

          <ul className=" space-y-4 pt-5">
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
            <li className="w-full">
              <button
                type="button"
                className="flex w-full items-center  rounded-lg bg-white py-5 px-2 text-center text-sm text-primary-heavy hover:opacity-50 lg:text-base"
              >
                <div className="flex w-[46.1176%] items-center justify-center lg:space-x-2 xl:space-x-4">
                  <Image
                    width={40}
                    height={40}
                    src="https://fakeimg.pl/40x40/EEECFA/"
                    alt="user_pic"
                    className="rounded-full"
                  />
                  <p>哈哈哈</p>
                </div>

                <div className="w-[42.1176%] ">5筆</div>

                <div className="flex w-[11.7647%] justify-center ">
                  <Image src={right} width={16} height={16} alt="icons" />
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
// const CounselorCenterTabAry = [
//   {
//     label: (
//       <div className="flex items-center justify-between space-x-4">
//         <Image src={user} alt="user_icon" width={20} height={20} />
//         <span className="">個人資料</span>
//       </div>
//     ),
//     key: '個人資料',
//     children: (
//       <div className="counselorTab -mt-[60px]">
//         <ConfigProvider
//           theme={{
//             token: {
//               colorPrimary: '#767494',
//               colorText: '#767494',
//               fontSize: 16,
//               margin: 32,
//             },
//           }}
//         >
//           <Tabs defaultActiveKey="1" items={counselorInfoTabAry} onChange={onChange} />
//         </ConfigProvider>
//       </div>
//     ),
//   },
//   {
//     label: (
//       <div className="flex items-center justify-between space-x-4">
//         <Image src={profile} alt="user_icon" width={20} height={20} />
//         <span className="">預約管理</span>
//       </div>
//     ),
//     key: '預約管理',
//     children: <CounselorReservationTab />,
//   },
//   {
//     label: (
//       <div className="flex items-center justify-between space-x-4">
//         <Image src={edit} alt="user_icon" width={20} height={20} />
//         <span className="">個案紀錄</span>
//       </div>
//     ),
//     key: '個案記錄',
//     children: <CounselorCaseRecordPC />,
//   },
// ];


export default function CounselorCenter() {
  return (
    <>



      {/* 手機版 預約管理 */}
      <section className="hidden pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>
          <CounselorReservationTab />
        </div>
      </section>

      {/* 手機版 個案記錄 */}
      <section className="pt-12 pb-28 lg:hidden lg:pt-[84px] lg:pb-[136px]">
        <div className="container">
          <div className="hidden rounded-full bg-bg2 py-[13px] text-center font-bold text-[#767494] lg:mb-[72px] lg:block">
            目前尚無預約
          </div>
          <h2 className="mb-12 text-center leading-loose lg:hidden">預約管理</h2>

          {/* 搜尋框 */}
          <div className="mb-6 w-full max-w-[200px]">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#5D5A88',
                  borderRadius: 9999,
                  colorTextPlaceholder: '#5D5A88',
                  // colorText: colorPrimary,
                  colorBgContainer: '#EEECFA',
                  // controlOutline: colorPrimary,
                },
              }}
            >
              <Input
                placeholder="輸入個案姓名"
                suffix={<SearchOutlined className="text-[#5D5A88]" />}
                className="border-none px-5 py-1 "
              />
            </ConfigProvider>
          </div>

          <CounselorCaseRecord />
        </div>
      </section>


    </>
  );
}
