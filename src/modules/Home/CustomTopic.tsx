/* eslint-disable react/no-array-index-key */
import TopicCard from './TopicCard';
// eslint-disable-next-line import/no-cycle
import { topicCardAry } from '../../lib/homeFilesRoute';

export default function CustomTopic() {
  return (
    <section className="container py-20 lg:py-0">
      <div className="flex flex-col items-center px-6 text-center sm:px-0 lg:pt-[100px] lg:pb-[164px]">
        <h2>客製化諮商主題</h2>
        <p className="subTitle mb-0 text-sm lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit
        </p>

        {/* 卡片 */}
        <ul className="mt-9 flex w-full flex-col space-y-6 lg:mt-[92px] lg:max-w-[1012px] lg:flex-row lg:flex-wrap lg:justify-between lg:space-y-0">
          {topicCardAry.map(({ type, text }, index) => {
            if (index <= 2) {
              return (
                <TopicCard key={index} type={type} text={text} gap="lg:mb-12" />
              );
            }
            return <TopicCard key={index} type={type} text={text} />;
          })}
        </ul>
      </div>
    </section>
  );
}
