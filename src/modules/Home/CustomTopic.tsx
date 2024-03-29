/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import { topicCardAry } from '@/lib/homeFilesRoute';
import TopicCard from './TopicCard';

export default function CustomTopic() {
  return (
    <section className="container pt-20 pb-6 lg:py-0">
      <div className="flex flex-col items-center px-6 text-center sm:px-0 lg:pt-[100px] lg:pb-[164px]">
        <h2>客製化諮商主題</h2>
        <p className="subTitle mb-0 text-sm lg:text-lg">選擇主題，讓諮商師為你量身定做專屬課程</p>

        {/* 卡片 */}
        <ul className="mt-9 flex w-full flex-col space-y-6 lg:mt-[92px] lg:max-w-[1012px] lg:flex-row lg:flex-wrap lg:justify-between lg:space-y-0 ">
          {topicCardAry.map(({ type, text, img, imgSM }, index) => {
            if (index <= 2) {
              return (
                <TopicCard key={index} type={type} text={text} gap="lg:mb-12" img={img} imgSM={imgSM} />
              );
            }
            return <TopicCard key={index} type={type} text={text} img={img} imgSM={imgSM} />;
          })}
        </ul>
      </div>
    </section>
  );
}
