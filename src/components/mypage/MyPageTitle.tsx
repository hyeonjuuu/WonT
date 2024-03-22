import { useFetchTripDataStore } from "@/store/useFetchTripDataStore";

interface MyPageTitleProps {
  text: string;
}

function MyPageTitle({ text }: MyPageTitleProps) {
  const { planData, setPlanData } = useFetchTripDataStore();
  console.log(planData);

  return (
    <div className="flex gap-2">
      <span className="font-semibold">{text}</span>
      <div className="rounded-full w-5 h-5 text-sm  bg-primary flex justify-center self-center">
        <span className="m-auto text-white">{planData?.length}</span>
      </div>
    </div>
  );
}

export default MyPageTitle;
