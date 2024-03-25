import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TourCategoryItem from "@/components/tripregion/TourCategoryItem";
import supabase from "@/lib/supabase/supabase";
import { RegionStore } from "@/store/RegionStore";
import { RegionToggleStore } from "@/store/RegionToggleStore";
import DataProps from "@/types/DataProps";

type RegionItemProps = {
  regionName: string;
  regionCode: number;
};

const RegionItem = ({
  regionName = "지역이름",
  regionCode,
}: RegionItemProps) => {
  const { selectedRegionName, setRegionName, resetRegionName } = RegionStore();
  const { toggleRegionName, setToggleRegionName } = RegionToggleStore();
  const [isToggle, setIsToggle] = useState(false);
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const [regionData, setRegionData] = useState<DataProps | null>(null);

  const selectRegion = () => {
    if (!selectedRegionName) {
      setRegionName(regionName);
    } else {
      setToggleRegionName("");
    }
    if (!toggleRegionName) {
      setToggleRegionName(regionName);
    } else {
      resetRegionName();
    }
  };

  useEffect(() => {
    if (toggleRegionName.length) setIsToggle(toggleRegionName == regionName);
    else setIsToggle(false);
  }, [toggleRegionName, regionName]);

  // 지역 상세 정보
  useEffect(() => {
    (async () => {
      if (isToggle) {
        let { data: region, error } = await supabase
          .from("local")
          .select("*")
          .eq("id", regionCode + 1);

        if (region) {
          setRegionData(region[0]);
        }
        if (error) {
          toast.info(
            `지역 정보를 불러오던 중 에러가 발생하였습니다.
            불편을 드려 죄송합니다.`,
            {
              position: "top-center",
              autoClose: 2500,
            },
          );
        }
      }
    })();
  }, [isToggle, regionCode]);

  return (
    <li
      className={`list-none ${isToggle && "grid col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-6 my-3 pt-5 pb-6 border-y-4 border-button mx-3"}`}
    >
      <button
        type="button"
        onClick={selectRegion}
        className="flex flex-col items-center gap-3 px-3 py-2"
      >
        <Image
          src={
            isImgError
              ? "/svg/default-image.svg"
              : `/images/local/local${regionCode}.jpg`
          }
          width={200}
          height={200}
          alt="선택한 여행 지역"
          onError={() => setIsImgError(true)}
          className={`w-[8.4375rem] h-[8.4375rem] rounded-xl object-cover ${isToggle && "shadow-md shadow-gray-400"}`}
        />
        <p
          className={`mx-3 my-1 text-lg text-contentSecondary font-medium ${isToggle && "px-3 py-1 rounded-xl bg-point text-white shadow-md shadow-gray-400"}`}
        >
          {regionName}
        </p>
      </button>
      {isToggle && regionData && (
        <section className="w-full mx-auto mt-2 p-3 rounded-xl bg-button shadow-md shadow-gray-400">
          <div className="flex flex-col gap-2 w-full mb-3 px-3 py-4 rounded-xl bg-white text-contentMuted ">
            <h3 className="text-content font-semibold">지역정보</h3>
            <p className="text-contentSecondary">{regionData.info}</p>
          </div>
          <div className="flex flex-col gap-2 w-full px-3 py-4 rounded-xl bg-white text-contentMuted">
            <h3 className="text-content font-semibold">관광지도</h3>
            <p>궁금한 주제를 선택해 보세요.</p>
            <nav className="flex flex-wrap gap-2 mt-3">
              <TourCategoryItem color="bg-[#F2A868]">관광지</TourCategoryItem>
              <TourCategoryItem color="bg-[#EE7D7B]">숙박</TourCategoryItem>
              <TourCategoryItem color="bg-[#F2A868]">여행코스</TourCategoryItem>
              <TourCategoryItem color="bg-[#EE7DA0]">문화시설</TourCategoryItem>
              <TourCategoryItem color="bg-[#F8D770]">음식점</TourCategoryItem>
              <TourCategoryItem color="bg-[#C0DD7D]">쇼핑</TourCategoryItem>
              <TourCategoryItem color="bg-[#9DCDD0]">레포츠</TourCategoryItem>
              <TourCategoryItem />
            </nav>
          </div>
        </section>
      )}
      <ToastContainer />
    </li>
  );
};

export default RegionItem;
