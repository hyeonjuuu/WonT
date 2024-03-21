import { ReviewDataTypes } from "@/types/ReviewDataTypes";
import EnterButton from "./EnterButton";

interface TripReviewFeedProps {
  reviewData: ReviewDataTypes;
}

function TripReviewFeed({ reviewData }: TripReviewFeedProps) {
  return (
    <a href="" className="flex flex-col w-100%  border-[#EDF2F2] border-[1px]">
      <img
        src={reviewData?.review_image[0]}
        alt=""
        className=" aspect-square object-cover"
      />
      <div className="flex flex-col px-3">
        <span className="text-primary text-sm underline w-fit my-[26px] ">
          {reviewData.region === null ? "지역" : reviewData.region}
        </span>
        <h3 className="text-3xl font-bold text-contentSecondary mb-2">
          {reviewData.title}
        </h3>
        <span className="text-xs text-contentMuted font-light">
          24.01.20 - 24.01.22
        </span>
      </div>
      <button className="self-end px-3 my-auto mb-7">
        <EnterButton />
      </button>
    </a>
  );
}

export default TripReviewFeed;
