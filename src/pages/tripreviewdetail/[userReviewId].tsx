import TripDays from "@/components/tripedit/TripDays";
import TripEditMap from "@/components/tripedit/TripEditMap";
import DetailReviewFeed from "@/components/tripreviewdetail/DetailReviewFeed";
import TripDetailMap from "@/components/tripreviewdetail/TripDetailMap";
import TripReviewDetailLayout from "@/layout/tripreviewdetail/layout";
import supabase from "@/lib/supabase/supabase";
import { useSessionStore } from "@/store/useSessionStore";
import { ReviewDataTypes } from "@/types/ReviewDataTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function index() {
  const { userSession, setUserSession } = useSessionStore();
  const router = useRouter();
  const { userReviewId } = router.query;
  const [reviewData, setReviewData] = useState<ReviewDataTypes>();

  useEffect(() => {
    const fetchingUserReviewData = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select()
        .eq("id", userReviewId)
        .maybeSingle();
      setReviewData(data);
      if (error) {
        console.error(error);
      }
    };

    fetchingUserReviewData();
  }, [userReviewId]);

  return (
    <TripReviewDetailLayout>
      <div className="w-[560px] mx-auto">
        <DetailReviewFeed reviewData={reviewData} />
        <div>
          <TripDetailMap />
          <div className="w-full h-[80px] bg-contentSecondary flex justify-between items-center px-5">
            <div className="flex flex-col">
              <span className="text-white">{reviewData?.review_data}</span>
              <span className="text-white">{reviewData?.created_at}</span>
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
