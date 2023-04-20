import { ConfigProvider, Form, Input, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { IButton } from '@/common/components/IButton';
import { classTopic } from '../../../lib/counselorCenterData';

export type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

// 諮商師 > 個人資料 > 課程資訊
export function ClassInfo() {
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
  // 課程特色
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value);
  };

  // 膠囊狀態
  const checkData = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editing = false;
  const hasData = '';
  const noData = '!CounselorCenterNoDataBtn';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEdit = '!bg-primary-heavy';

  useEffect(() => {
    console.log(classTopic);
  }, []);

  // const [isOpen, setIsOpen] = useState<boolean>(true);

  // function isNoCourses() {
  //   if (FieldIds2?.length === 0) {
  //     return (
  //       <NoCourses
  //         text="尚未新增課程資訊"
  //         height="h-[338px]"
  //         extraStyle={`${isOpen} ? '!hidden' : ''`}
  //       />
  //     );
  //   }
  // }

  // const [isOpen, setIsOpen] = useState<boolean>(true);

  // function isNoCourses() {
  //   if (FieldIds2?.length === 0) {
  //     return (
  //       <NoCourses
  //         text="尚未新增課程資訊"
  //         height="h-[338px]"
  //         extraStyle={`${isOpen} ? '!hidden' : ''`}
  //       />
  //     );
  //   }
  // }

  return (
    <>
      <div className=" space-y-10 px-5 lg:mt-2 lg:space-y-12 ">
        <div className="flex-row lg:flex">
          <h3 className="mr-2 mb-4 text-base font-bold text-secondary lg:mb-0 lg:w-[10%]">
            專長領域 *
          </h3>
          <div className="flex flex-wrap justify-around lg:w-[80%] lg:flex-nowrap lg:justify-between lg:space-x-3">
            {classTopic.map((item) => (
              <IButton
                text={item.topicName}
                fontSize={`text-[14px] ${checkData ? '' : '!text-gray-600'}`}
                px="w-[104px] lg:w-[112px]"
                py="py-2 lg:py-[10px]"
                extraStyle={checkData ? hasData : noData}
                key={item.id}
              />
            ))}
          </div>
        </div>
        <div className="flex-row lg:flex">
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
            課程方案 *
          </h3>
          {/* PC 課程方案 */}
          {/* 判斷有無課程資料，渲染課程方案、課程特色 */}
          {/* {isNoCourses(isSuccess)} */}
          {/* 點擊膠囊前，初始畫面 */}
          {/* isSuccess && (
            <NoCourses text="請先選擇專長領域" height="h-[338px]" />
          ) */}
          <div
            className="w-[90%] rounded-2xl bg-gray-200 pb-9"
          >
            <ul className="flex w-full border-b  border-gray-400 py-5 text-sm font-bold text-gray-900 lg:w-auto lg:px-0 lg:text-center">
              <li className="lg:w-[33.33%]">專長領域</li>
              <li className="lg:w-[33.33%]">定價</li>
              <li className="lg:w-[33.33%]">是否開放</li>
            </ul>
            <ul className="w-full space-y-4 px-3 pt-5 lg:px-0 lg:pt-7">
              <li className="flex w-full flex-col items-center space-x-10 rounded-lg py-5 text-sm text-primary-heavy lg:space-x-0 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#9E9E9E',
                      colorText: '#424242',
                      colorBorder: '#BDBDBD',
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
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    {/* PC 課程方案＋定價 */}
                    <div className="flex w-full flex-col space-y-4">
                      <div className="flex items-center">
                        <div className="w-[33.33%]">1 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[33.33%]">3 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[33.33%]">5 堂</div>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[33.33%]">體驗課 1 堂</div>
                        <Form.Item className="mb-0 w-[33.33%]">
                          <Input
                            disabled={editInfo}
                            placeholder="請填寫價格"
                            className="font-normal"
                            style={{ height: 40, width: 124 }}
                          />
                        </Form.Item>
                        <Form.Item className="mb-0 lg:w-[33.33%]">
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </ConfigProvider>
              </li>
            </ul>
          </div>
          {/* Mobile 課程方案 */}
          <div className="rounded-2xl bg-gray-200 lg:hidden">
            <ul className="flex w-full border-b  border-gray-400 py-5 px-0 text-center text-sm font-bold text-gray-900">
              <li className="w-[33.33%]">專長領域</li>
              <li className="w-[33.33%]">定價</li>
              <li className="w-[33.33%]">是否開放</li>
            </ul>
            <ul className="flex flex-col space-y-4 pt-5 ">
              <li className="items-center space-x-10 rounded-lg text-sm text-primary-heavy">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#9E9E9E',
                      colorText: '#424242',
                      colorBorder: '#BDBDBD',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  <Form form={form} name="classInfo" onFinish={onFinish}>
                    {/* 課程方案＋定價 */}
                    <div className="flex flex-col space-y-4 pb-7">
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
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
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
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
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
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex w-[33.33%] justify-center text-center">
                          <p className="w-[42px]">體驗課 1 堂</p>
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
                          <Switch
                            defaultChecked
                            onChange={SwitchOnChange}
                            disabled={editInfo}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </ConfigProvider>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-row lg:flex">
          <h3 className="mr-2 mb-4 border-t border-gray-400 pt-10 font-bold text-secondary lg:mb-0 lg:w-[10%] lg:border-none lg:pt-0">
            課程特色 *
          </h3>
          <div className="rounded-2xl bg-gray-200 pb-9 lg:w-[90%]">
            <ul className="w-full space-y-4 pt-5 lg:px-0 lg:pt-7">
              <li className="flex w-full flex-col items-center rounded-lg py-5 text-sm text-primary-heavy lg:space-x-10 lg:text-center lg:text-base">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: '#9E9E9E',
                      colorText: '#424242',
                      colorBorder: '#BDBDBD',
                      colorIcon: '#5D5A88',
                      fontSize: 14,
                      borderRadius: 10,
                      controlHeight: 40,
                    },
                  }}
                >
                  {/* PC 課程特色 textarea */}
                  <div className="hidden w-full lg:block">
                    <Form
                      form={form}
                      name="classInfo"
                      onFinish={onFinish}
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
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
                        className="mb-8 px-[56px]"
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
                        className="mb-8 px-[56px]"
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
                        name="特色 4"
                        label="特色 4"
                        className="mb-8 px-[56px]"
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
                        name="特色 5"
                        label="特色 5"
                        className="mb-8 px-[56px]"
                      >
                        <TextArea
                          showCount
                          maxLength={25}
                          style={{ height: 4, resize: 'none' }}
                          onChange={onChange}
                          placeholder="寫下適合對象、課程目標、進行方式、或事前須知"
                          disabled={editInfo}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                  {/* Mobile 課程特色 textarea */}
                  <div className="class-info w-full px-5 lg:hidden">
                    <Form
                      form={form}
                      name="classInfo"
                      onFinish={onFinish}
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
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
        <input
          type="button"
          value="刪除此專長領域"
          className="mt-4 text-base text-gray-900 underline underline-offset-2 hover:text-red-500"
        />
      </div>
      <div className="mt-12 flex justify-end space-x-7">
        <IButton
          text="編輯"
          fontSize="text-[14px] lg:text-base"
          px="px-[66px] lg:px-[74px]"
          py="py-4"
          onClick={() => setEditInfo(false)}
        />
        {!editInfo && (
          <IButton
            text="儲存"
            fontSize="text-[14px] lg:text-base"
            px="px-[66px] lg:px-[74px]"
            py="py-4"
          />
        )}
      </div>
    </>
  );
}
