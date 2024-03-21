import { useModalStateStore } from "@/store/useModalStateStore";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

type ButtonLargePropType = {
  isSelected?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const SelectButton = ({
  onClick,
  children = "선택 완료",
}: ButtonLargePropType) => {
  const { showModal, setShowModal } = useModalStateStore();
  const buttonClasses = "w-80 h-16 rounded-xl font-bold text-white";

  const handleModalState = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleModalState}
        className={`${buttonClasses} bg-primary text-center align-middle leading-[4rem]`}
      >
        {children}
      </button>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SelectButton;
