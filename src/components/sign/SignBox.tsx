import Link from "next/link";
import React from "react";

function SignBox() {
  return (
    <div className="flex justify-center w-[13.75rem]">
      <div className="mr-7">
        <button type="button">비밀번호 찾기</button>
      </div>
      <div className="border-r border-gray-300 h-[1.25rem]"></div>
      <div className="ml-10">
        <Link href="/signup">
          <button type="button">회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default SignBox;
