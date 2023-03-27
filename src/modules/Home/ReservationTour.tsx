/* eslint-disable import/no-cycle */
import { reservationCardAry } from '@/lib/homeFilesRoute';
import ReservationStepCard from './ReservationStepCard';

export default function ReservationTour() {
  return (
    <section className="">
      <div className="container py-20 text-center lg:py-[180px]">
        <div className="lg:flex lg:justify-between ">
          <div>
            <h2 className="mb-9 lg:mt-[68px] lg:text-left">預約教學</h2>
          </div>

          <ul className="flex flex-col items-center space-y-8 lg:w-[704px] lg:flex-row  lg:flex-wrap lg:items-start lg:justify-between lg:space-y-0">
            {reservationCardAry.map(({ step, img, extraStyle }) => (
              <ReservationStepCard key={step} step={step} img={img} extraStyle={extraStyle} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
