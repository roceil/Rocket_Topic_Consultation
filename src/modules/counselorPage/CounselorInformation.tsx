import Image from 'next/image';
import { Breadcrumb } from 'antd';
import { ICounselorInformationProps } from '@/types/interface';

export default function CounselorInformation({ counselorPageBreadcrumb, Photo, Name, SelfIntroduction, FieldTags }: ICounselorInformationProps) {
  return (
    <section className="bg-primary py-14 lg:pt-[84px] lg:pb-[124px]">
      <div className="container">
        <Breadcrumb items={counselorPageBreadcrumb} />
        <div className="mt-6 flex w-full justify-center lg:mt-14">
          <div className="flex flex-col items-center lg:w-full lg:max-w-[1012px] lg:flex-row lg:items-center lg:justify-between">
            <Image className="rounded-2xl" src={Photo} alt={Name} width={400} height={400} priority />

            <div className="mt-10 w-full max-w-[340px] border-y border-secondary pt-6 pb-8 lg:mt-0 lg:min-h-[400px] lg:max-w-[492px] lg:pt-10 lg:pb-[45px]">
              <h2 className="mb-4 w-full text-left lg:mb-6">{Name}</h2>

              {/* 手機版FieldTags */}
              <ul className="mb-8 flex w-[340px] flex-wrap lg:hidden">
                {FieldTags.map((topic: string, index: number) => {
                  if (index < 3) {
                    return <li className="fakeBorder mr-4 w-full max-w-[96px] rounded-full py-3 text-center text-sm font-semibold text-secondary ">{topic}</li>;
                  }
                  if (index >= 3) {
                    return <li className="fakeBorder mr-4  mt-3 w-full max-w-[96px] rounded-full py-3 text-center text-sm font-semibold text-secondary ">{topic}</li>;
                  }
                  return null;
                })}
              </ul>

              {/* 電腦版FieldTags */}
              <ul className="hidden flex-wrap  lg:mb-14 lg:flex">
                {FieldTags.map((topic: string, index: number) => {
                  if (index < 4) {
                    return <li className="fakeBorder mr-3 w-full rounded-full py-3 text-center text-sm  font-semibold text-secondary lg:max-w-[104px]">{topic}</li>;
                  }
                  if (index >= 4) {
                    return <li className="fakeBorder mt-3  mr-3 w-full rounded-full py-3 text-center text-sm  font-semibold text-secondary lg:max-w-[104px]">{topic}</li>;
                  }
                  return null;
                })}
              </ul>

              {/* 自我介紹 */}
              <p className="text-sm text-gray-900 lg:text-lg">{SelfIntroduction}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
