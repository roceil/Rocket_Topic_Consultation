import { ITopicCardProps } from '@/types/interface'

export function TopicCard({ gap, type, text }: ITopicCardProps) {
  return (
    <li
      className={`flex items-center space-x-6 rounded-xl border border-secondary py-3 pl-3 sm:max-w-none lg:w-[316px] lg:flex-col lg:space-x-0 lg:border-none lg:p-0 ${gap}`}
    >
      {/* 這是圖片 */}
      <div className='h-[80px] w-[80px] rounded-2xl border border-b-0 border-secondary bg-secondary lg:h-[286px] lg:w-[316px] lg:rounded-b-none'></div>
      
      {/* 文字區塊 */}
      <div className='text-left lg:w-full lg:rounded-b-2xl lg:border lg:border-secondary lg:pt-5 lg:pb-8 lg:text-center'>
        <h3 className='mb-2 font-bold text-primary-heavy lg:text-xl'>{type}</h3>
        <p className='text-xs text-[#767494] lg:text-base'>{text}</p>
      </div>
    </li>
  )
}
