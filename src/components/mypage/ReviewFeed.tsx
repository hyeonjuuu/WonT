import { ReviewDataTypes } from "@/types/ReviewDataTypes";
import { useEffect } from "react";

interface TripReviewFeedProps {
  reviewData: ReviewDataTypes;
}

function ReviewFeed({ reviewData }: TripReviewFeedProps) {
  useEffect(() => {
    console.log(reviewData.review_image.map((item) => item));
    console.log(Array.from(reviewData.review_image)[0]);
    console.log(reviewData);
  }, []);

  return (
    <li className="w-full items-center flex flex-col h-fit bg-white justify-center">
      {/* <Image
        src={myReviewDefaultImage1}
        alt=""
        className="w-100% object-cover"
      /> */}
      <a
        href={`/tripreviewdetail/${reviewData.id}`}
        className="w-100% w-full items-center flex flex-col"
      >
        <img
          src={Array.from(reviewData.review_image)[0]}
          alt=""
          className="w-100% object-cover"
        />
        <span className="mt-10 text-contentMuted text-xs">2024년 1월</span>
        <span className="mb-10 font-semibold text-[16px] text-contentSecondary">
          서울 여행
        </span>
      </a>
    </li>
  );
}

export default ReviewFeed;
