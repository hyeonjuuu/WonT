import Link from "next/link";
import Image from "next/image";

const Custom404 = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 min-h-svh">
      <Image src="/svg/logo.svg" alt="wont" width={200} height={80} />
      <span className="font-bold text-content text-2xl">404 ERROR</span>
      <span className="text-contentSecondary">
        이용에 불편을 드려 죄송합니다.
      </span>
      <Link
        href="/main"
        className="px-3 h-10 rounded-lg bg-primary text-white text-lg font-bold text-center align-middle leading-10"
      >
        메인으로 이동
      </Link>
    </section>
  );
};

export default Custom404;
