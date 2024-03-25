import React from "react";

interface SignInputProps {
  text: string;
  placeholder: string;
  type: "email" | "password" | "text";
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignInput: React.FC<SignInputProps> = ({
  text,
  placeholder,
  type,
  value,
  onChange,
  
}) => {
  return (
    <div className="pt-[1.5rem] min-w-[18.75rem]  flex flex-col gap-3 border-b-2 border-primary mx-auto pb-[0.313rem]">
      <p className="text-[1rem]">{text}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="text-[1rem]"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default SignInput;
