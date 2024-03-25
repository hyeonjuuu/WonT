import Link from "next/link";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import Logo from "@/public/svg/logo.svg";
import Image from "next/image";
import { PiUserCircle } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import supabase from "@/lib/supabase/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HeaderMain = () => {
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("로그아웃에 성공하셨습니다", {
        position: "top-center",
        autoClose: 1500,
      });
      window.location.href = "/";
    } else {
    }
  };

  return (
    <nav className="pt-[1.25rem] pl-[1.25rem] h-[3.75rem] flex justify-between px-[20px]">
      <Link href="/main">
        <Image src={Logo} priority alt="Wont 로고" height={30} width={75} />
      </Link>

      <div className="flex gap-3">
        <button type="button">
          <Link href="/main">
            <AiOutlineHome size={30} />
          </Link>
        </button>

        <button type="button">
          <Link href="/mypage">
            <PiUserCircle size={30} />
          </Link>
        </button>
        <button type="button" onClick={logOut}>
          <MdLogout size={30} />
        </button>
      </div>
    </nav>
  );
};

export default HeaderMain;
