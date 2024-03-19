import MyPageTitle from "@/components/mypage/MyPageTitle";
import ReviewFeed from "@/components/mypage/ReviewFeed";
import supabase from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";

function MyReview() {
  const [review, setReview] = useState<any[] | null>();

  useEffect(() => {
    const fetchingReviewData = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select()
        .order("created_at", { ascending: false });
      console.log(data);
      setReview(data);
      if (error) {
        console.error(error);
      }
    };

    fetchingReviewData();
    console.log(review);
  }, [setReview]);
  return (
    <div>
      <MyPageTitle text="여행 리뷰" />
      <ul className="grid grid-cols-2 my-5 gap-3 ">
        {review?.map((item) => <ReviewFeed reviewData={item} />)}
      </ul>
    </div>
  );
}

export default MyReview;
