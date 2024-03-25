import React from "react";

interface SignButtonProps {
  text: string;
  onClick?: () => void;
}

const SignButton: React.FC<SignButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="submit"
      className="bg-primary w-[18.75rem] h-[3.75rem] rounded-md text-white hover:bg-point hover:text-black"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SignButton;
