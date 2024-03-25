import React, { ChangeEvent, useEffect, useState } from "react";
import NickNameLayout from "@/layout/signnickname/layout";
import DefaultProfile from "@/components/mypage/DefaultProfile";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignNickName = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserUuid = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error(
            "세션을 가져오는 동안 오류가 발생했습니다:",
            error.message,
          );
          router.push("/signin");
        } else if (data) {
          setUserUuid(data.session?.user.id || null);
          const { data: userProfile, error: profileError } = await supabase
            .from("profiles")
            .select("nickname")
            .eq("id", data.session?.user.id)
            .single();
          if (profileError) {
            console.error(
              "프로필을 가져오는 중 오류 발생:",
              profileError.message,
            );
          } else if (userProfile && userProfile.nickname) {
            router.push("/main");
          }
        } else {
          console.error("사용자 정보를 찾을 수 없습니다.");
          router.push("/signin");
        }
      } catch (error) {
        console.error(
          "세션을 가져오는 동안 예기치 않은 오류가 발생했습니다:",
          error,
        );
        router.push("/signin");
      }
    };

    fetchUserUuid();
  }, [router]);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSaveNickname = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: userUuid, nickname: nickname });

      if (error) {
        console.error("프로필 저장 중 오류 발생:", error.message);
      } else {
        toast.success("닉네임 등록이 완료 되었습니다.", {
          position: "top-center",
          autoClose: 1500,
        });
        router.push("/main");
      }
    } catch (error) {
      console.error("프로필 저장 중 예기치 않은 오류가 발생했습니다:", error);
    }
  };

  return (
    <NickNameLayout>
      <div>
        <div className="w-[320px] h-[250px] border border-content shadow-md flex flex-col items-center justify-center gap-5">
          <DefaultProfile />
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="border border-content w-[200px] h-[40px] pl-2"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <button
            type="button"
            className="bg-primary w-[200px] h-[40px] rounded-lg hover:bg-secondary"
            onClick={handleSaveNickname}
          >
            설정완료
          </button>
        </div>
        <ToastContainer />
      </div>
    </NickNameLayout>
  );
};

export default SignNickName;
