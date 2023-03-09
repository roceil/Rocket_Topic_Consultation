import { CounselorCard } from './CounselorCard';
import { fakeCounselorAry } from '../../lib/homeFilesRoute';


export function SuggestCounselor() {
  return (
    <section className='bg-[#FAFAFF] '>
      <div className='container flex w-screen flex-col items-center  py-20 text-center'>
        <h2 className='font-bold text-primary-heavy '>推薦諮商師</h2>
        <p className='mt-2 mb-3 text-primary lg:mt-3 lg:mb-[76px] lg:max-w-[612px] lg:text-lg'>
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <div className='block lg:hidden'>
          <CounselorCard />
        </div>
        <ul className='hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-16'>
          {fakeCounselorAry.map((data, index) => {
            return <CounselorCard key={index} />;
          })}
        </ul>
      </div>
    </section>
  );
}
