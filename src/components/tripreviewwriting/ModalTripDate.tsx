import { TripCalendar } from "@/components/tripdate/TripCalendar";
import { TripDateInfo } from "@/components/tripdate/TripDateInfo";
import { DatesStore } from "@/store/DatesStore";
import { getTripDateKo } from "@/utils/getTripDate";
import { toast } from "react-toastify";
import { useEffect } from "react";
import SelectButton from "./SelectButton";

const ModalTripDate = (props: { clickModal: any }) => {
  const { clickModal } = props;
  const { tripDates } = DatesStore();

  const selectDatesRangeText = tripDates
    ? `${tripDates[0]} ~ ${tripDates[tripDates.length - 1]}`
    : getTripDateKo(new Date());

  // const inSelectedTripDates = () => {
  //   toast.error("여행 일자를 선택해 주세요!", {
  //     position: "top-center",
  //     autoClose: 2500,
  //   });
  // };
  console.log(tripDates);
  console.log(tripDates?.length);

  return (
    <div onClick={clickModal} className="fixed z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute  bg-[#f9fefe] border border-[#e8efef] flex flex-col justify-center "
      >
        <TripCalendar />
        <TripDateInfo contents={selectDatesRangeText} />
        <SelectButton type="date" />
      </div>
    </div>
  );
};
export default ModalTripDate;