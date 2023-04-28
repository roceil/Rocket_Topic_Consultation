import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { EditOutlined } from '@ant-design/icons';
import userIcon from 'public/images/chatRoom/userIcon.svg';
import { ICounselorRenderList } from '@/types/interface';
import { useState } from 'react';
import CounselorRecordForm from '../reservation/CounselorRecordForm';

export default function CounselorRecordList({ renderData }:{ renderData:any }) {
  const [courseId, setCourseId] = useState<number | null>(null);

  // ====================== 個案記錄表格 Modal 開關 ======================
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div>
        {/* 表格 */}
        <div className="overflow-x-auto rounded-2xl bg-gray-200 pb-9 lg:pb-12 px-7">
          <ul className="flex w-[624px] border-b border-gray-400  py-5  text-sm font-bold text-gray-700 lg:w-auto lg:text-center">
            <li className="w-1/5 ">個案姓名</li>
            <li className="w-1/5">諮商議題</li>
            <li className="w-1/5">諮商日期</li>
            <li className="w-1/5">記錄日期</li>
            <li className="w-1/5" />
          </ul>

          <ul className="w-[588px] space-y-4  pt-5 lg:w-auto  lg:pt-7">
            {renderData.map(({ Name, Field, AppointmentTime, AppointmentId, AppointmentDate }:ICounselorRenderList) => {
              const convertDate = dayjs(AppointmentDate).format('YYYY / MM / DD');
              const convertRecordDate = dayjs(AppointmentTime).format('YYYY / MM / DD');
              return (
                <li key={uuidv4()} className="flex items-center rounded-lg bg-white py-5 text-center text-sm text-gray-900 lg:space-x-0 lg:text-base">
                  <div className="w-[20.1438%] flex justify-center items-center space-x-4">
                    <Image src={userIcon} alt="userIcon" width={40} height={40} className="ring-1 ring-secondary rounded-full" />
                    <span className="ml-2">{Name}</span>
                  </div>

                  <div className="w-[20.1438%]">{Field}</div>
                  <div className="w-[22.1438%]">{convertDate}</div>
                  <div className="w-[20.1438%]">{convertRecordDate}</div>
                  <button
                    type="button"
                    className="flex w-[19.4244%] justify-center text-xs lg:text-sm hover:opacity-50"
                    onClick={() => {
                      setCourseId(AppointmentId);
                      setIsModalOpen(true);
                    }}
                  >
                    <EditOutlined className="text-xl" />
                  </button>
                </li>
              );
            })}
          </ul>
          <CounselorRecordForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} renderData={renderData} AppointmentId={courseId} />
        </div>
      </div>

    </div>
  );
}

