import Image from "next/image";
import SignUpLayout from "@/layout/signup/layout";
import SignInput from "@/components/sign/SignInput";
import SignButton from "@/components/sign/SignButton";
import { useRouter } from "next/router";
import useSignUpStore from "@/store/useSignUpStore";
import supabase from "@/lib/supabase/supabase";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const signUpStore = useSignUpStore();

  useEffect(() => {
    return () => {
      signUpStore.setSignUp({
        email: "",
        password: "",
        confirmPassword: "",
      });
    };
  }, []);

  const handleSignUp = async () => {
    const { email, password, confirmPassword } = signUpStore;
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다", {
        position: "top-center",
        autoClose: 1500,
      });
      router.push("/");

      return;
    } else {
      toast.success("회원가입에 성공했습니다.", {
        position: "top-center",
        autoClose: 1500,
      });
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.error("회원가입 중 오류가 발생했습니다.", error.message);
      } else {
        toast.success("회원가입이 성공했습니다.", {
          position: "top-center",
          autoClose: 1500,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("회원가입 중 예기치 않은 오류가 발생했습니다.", error);
    }
  };
  return (
    <SignUpLayout>
      <div className="pt-[5.25rem] flex flex-col">
        <div className="flex flex-col justify-center items-center gap-5">
          <Image
            src="/svg/logo.svg"
            alt="wont 로고"
            width={150}
            height={50}
            priority
          />
          <SignInput
            type="email"
            text="이메일 주소"
            placeholder="이메일 주소를 입력해 주세요"
            value={signUpStore.email}
            onChange={(e) => signUpStore.setSignUp({ email: e.target.value })}
          />
          <SignInput
            type="password"
            text="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={signUpStore.password}
            onChange={(e) =>
              signUpStore.setSignUp({ password: e.target.value })
            }
          />

          <div className="">
            <p className="text-[0.7rem] text-red-500">
              8자리 이상의 숫자, 대문자, 소문자, 특수문자 조합으로 입력해주세요.
            </p>
          </div>

          <SignInput
            type="password"
            text="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해 주세요"
            value={signUpStore.confirmPassword}
            onChange={(e) =>
              signUpStore.setSignUp({ confirmPassword: e.target.value })
            }
          />
          <SignButton text="회원가입" onClick={handleSignUp} />
        </div>
        <ToastContainer />
      </div>
    </SignUpLayout>
  );
};

export default SignUpPage;
