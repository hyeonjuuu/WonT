import SaveButton from "@/components/tripedit/SaveButton";
import TripDays from "@/components/tripedit/TripDays";
import TripEditMap from "@/components/tripedit/TripEditMap";
import DetailReviewFeed from "@/components/tripreviewdetail/DetailReviewFeed";
import TripDetailMap from "@/components/tripreviewdetail/TripDetailMap";
import TripReviewDetailLayout from "@/layout/tripreviewdetail/layout";

function index() {
  return (
    <TripReviewDetailLayout>
      <div className="w-[560px] mx-auto">
        <DetailReviewFeed />
        <div>
          <TripDetailMap />
          <div className="w-full h-[80px] bg-contentSecondary flex justify-between items-center px-5">
            <div className="flex flex-col">
              <span className="text-white">제주</span>
              <span className="text-white">24.01.20 - 24.01.22</span>
            </div>
            <button className="border-[1px] w-[56px] h-7 rounded-md border-contentMuted text-contentMuted text-sm">
              수정
            </button>
          </div>
          <section>
            <div className="mt-7 mb-10">
              <TripDays />
            </div>
          </section>
        </div>
      </div>
    </TripReviewDetailLayout>
  );
}

export default index;
