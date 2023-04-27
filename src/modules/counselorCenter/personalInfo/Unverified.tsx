import { NoCourses } from '@/modules/counselorCenter/personalInfo/NoCourses';

export function Unverified() {
  return (
    <>
      <h2 className="w-full text-center text-[28px] text-secondary">
        身份驗證中
      </h2>
      <NoCourses
        text="我們會在 5 個工作天內完成您的身份驗證，待身份驗證完成後，就能填寫課程資訊囉！"
        height="h-[344px] !mt-12"
      />
    </>
  );
}
