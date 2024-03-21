import TripDateLayout from "@/layout/tripdate/layout";
import HeaderTripSelect from "@/components/header/HeaderTripSelect";
import { TripCalendar } from "@/components/tripdate/TripCalendar";
import { TripDateInfo } from "@/components/tripdate/TripDateInfo";
import { TripScheduleInfo } from "@/components/tripdate/TripScheduleInfo";
import ButtonLarge from "@/components/common/ButtonLarge";
import { DatesStore } from "@/store/DatesStore";
import { SelectPlacesStore } from "@/store/PlacesStore";
import { SelectAccommodationsStore } from "@/store/AccommodationsStore";
import { getTripDateKo } from "@/utils/getTripDate";
import { toast } from "react-toastify";

const ModalTripDate = (props: { clickModal: any }) => {
  const { clickModal } = props;

  const { tripDates } = DatesStore();
  const { setTripPlacesRange } = SelectPlacesStore();
  const { setTripAccommodationsRange } = SelectAccommodationsStore();

  const selectDatesRangeText = tripDates
    ? `${tripDates[0]} ~ ${tripDates[tripDates.length - 1]}`
    : getTripDateKo(new Date());

  const inSelectedTripDates = () => {
    toast.error("여행 일자를 선택해 주세요!", {
      position: "top-center",
      autoClose: 2500,
    });
  };

  return (
    <div onClick={clickModal}>
      {" "}
      <TripDateLayout>
        <TripCalendar />
        <TripDateInfo contents={selectDatesRangeText} />
        <ButtonLarge
          isSelected={Boolean(tripDates)}
          href="/tripedit"
          onClick={inSelectedTripDates}
        />
      </TripDateLayout>
    </div>
  );
};
export default ModalTripDate;
