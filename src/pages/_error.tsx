import Link from "next/link";
import Image from "next/image";

const Error = ({ statusCode }: { statusCode: number | string }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 min-h-svh">
      <Image src="/svg/logo.svg" alt="wont" width={200} height={80} />
      <span className="text-2xl font-bold text-content">Page Not Found</span>
      <span className="text-contentSecondary">
        {statusCode
          ? `${statusCode} ERROR`
          : `존재하지 않는 주소를 입력하셨거나, <br /> 요청하신 페이지의 주소가 변경,
        삭제되어 찾을 수 없습니다.`}
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

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
