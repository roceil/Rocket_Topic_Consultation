import { topicCardAry } from '../../lib/homeFilesRoute'
import { ISuggestCounselorCardProps } from '@/types/interface'


export function CounselorCard({ name, rankTag }: ISuggestCounselorCardProps) {
  return (
    <div className='p-[36px]'>
      <div className='max-w-[244px] lg:max-w-[280px]'>
        {/* 這是圖片 */}
        <div className='h-[244px] w-[244px] rounded bg-secondary lg:h-[280px] lg:w-[280px]'></div>

        {/* 諮商師名稱 */}
        <div className='flex items-center justify-between px-2'>
          <span className='py-5 text-left text-xl font-bold text-primary-heavy lg:text-[28px]'>
            {name}
          </span>
          <div className='rounded border border-primary py-1 px-3 '>
            <p className='text-xs font-bold text-primary'>{rankTag}</p>
          </div>
        </div>

        {/* 諮商師tag */}
        <ul className='flex flex-wrap border-y-2 border-third py-2'>
          {topicCardAry.map(({ type }, index) => {
            return (
              <li
                key={index}
                className=' py-2 px-3 text-xs font-bold text-primary lg:text-sm'
              >
                <p>{`#${type}`}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
