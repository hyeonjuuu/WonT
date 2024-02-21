const TripTitle = ({
  title = "여행을 떠나시나요?",
  guide = "선택해 주세요.",
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-contentSecondary">{title}</h1>
      <h2 className="text-sm font-light text-contentMuted">{guide}</h2>
    </div>
  );
};

export default TripTitle;