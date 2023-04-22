import React from 'react';

export interface INoCoursesProps {
  text: string;
  height: string;
  extraStyle?: string;
}

// 無課程資料時，顯示此 div
export function NoCourses({ text, height, extraStyle }: INoCoursesProps) {
  return (
    <div className={`container z-50 flex w-full items-center justify-center rounded-2xl bg-gray-200 ${height} ${extraStyle}`}>
      <h1 className="text-lg text-secondary">{text}</h1>
    </div>
  );
}
