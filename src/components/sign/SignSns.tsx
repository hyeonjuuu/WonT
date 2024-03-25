import React from "react";
import Image from "next/image";
import {
  signInWithGoogle,
  signInWithKakao,
  signInWithGitHub,
} from "@/lib/supabase/Auth";

function SignSns() {
  const handleGoogleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleKakaoSignIn = async () => {
    try {
      const userData = await signInWithKakao();
      console.log("카카오로 로그인한 사용자 정보:", userData);
    } catch (error) {
      console.error("Kakao sign-in error:", error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const userData = await signInWithGitHub();
      console.log("깃허브로 로그인한 사용자 정보:", userData);
    } catch (error) {
      console.error("Kakao sign-in error:", error);
    }
  };

  return (
    <div className="flex justify-between w-[17.5rem]">
      <button
        type="button"
        className="flex flex-col item-center justify-center gap-3"
        onClick={handleKakaoSignIn}
      >
        <Image
          src="/svg/kakao-login.svg"
          alt="카카오톡"
          width={50}
          height={50}
          priority
        />
        <div className="text-gray-400">
          <p>카카오톡</p>
          <p>시작하기</p>
        </div>
      </button>

      <button
        type="button"
        className="flex flex-col item-center justify-center gap-3"
        onClick={handleGoogleSignIn}
      >
        <Image
          src="/svg/google-login.svg"
          alt="구글"
          width={50}
          height={50}
          priority
        />
        <div className="text-gray-400">
          <p>Google</p>
          <p>시작하기</p>
        </div>
      </button>

      <button
        type="button"
        className="flex flex-col item-center justify-center gap-3"
        onClick={handleGitHubSignIn}
      >
        <Image
          src="/svg/github-login.svg"
          alt="카카오톡"
          width={50}
          height={50}
          priority
        />
        <div className="text-gray-400">
          <p>깃허브</p>
          <p>시작하기</p>
        </div>
      </button>
    </div>
  );
}

export default SignSns;
