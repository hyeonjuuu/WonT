import Image from "next/image";
import myPlanDefaultImage from "/public/mypage/myPlanDefaultImage.jpg";
import MyPageTitle from "./MyPageTitle";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabase/supabase";
import { useSessionStore } from "@/store/useSessionStore";
import { TOUR_BASE_AREA } from "@/lib/tour/tour";
import Router from "next/router";
import { useFetchTripDataStore } from "@/store/useFetchTripDataStore";

type RegionDataType = {
  rnum: number;
  name: string;
  url: string;
};

function MyPlan() {
  const { userSession, setUserSession } = useSessionStore();
  const [userSessionId, setUserSessionId] = useState<string | undefined>();
  const { planData, setPlanData } = useFetchTripDataStore();
  const [regionData, setRegionData] = useState<RegionDataType[] | null>(null);
  const [tripPlan, setTripPlan] = useState<RegionDataType[]>();

  useEffect(() => {
    const fetchingPlanData = async () => {
      const { data, error } = await supabase
        .from("tripplan")
        .select()
        .eq("user_id", userSession?.user.id)
        .order("created_at", { ascending: false });

      setPlanData(data);

      if (error) {
        console.error(error);
      }
    };
    fetchingPlanData();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(TOUR_BASE_AREA);
      const json = await response.json();

      const dataWithImages = json.response.body.items.item.map(
        (item: RegionDataType, rnum: number) => ({
          ...item,
          url: `/images/local/local${rnum}.jpg`,
        }),
      );
      setRegionData(dataWithImages);
    })();
  }, []);
  // console.log(regionData);

  useEffect(() => {
    if (regionData && planData) {
      const findRegion = regionData.filter(
        (item) =>
          item.name ===
          planData?.map((item) => `${item.region_name}`).toString(),
      );
      setTripPlan(findRegion);
      console.log(tripPlan?.map((item) => item.url));
    }
  }, [regionData, planData]);

  const handleRoute = (e: React.MouseEvent, id: number) => {
    Router.push(`/tripedit/${id}`);
  };

  return (
    <div>
      <MyPageTitle text="나의 일정" />
      {planData?.map((planItem) => (
        <React.Fragment key={planItem}>
          <div className="grid my-5 sm:grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 gap-3">
            {tripPlan?.map((item, index) => (
              <React.Fragment key={index}>
                <button
                  className="w-100% h-[200px] sm:h-[280px] w-full object-cover rounded-lg"
                  onClick={(e) => handleRoute(e, planItem.id)}
                >
                  <Image
                    width={100}
                    height={100}
                    src={item.url}
                    alt="Plan Image"
                    className="w-100% h-[200px] sm:h-[280px] w-full object-cover rounded-lg"
                  />
                </button>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MyPlan;
