import { HomeAnimationLottie } from "@/components/animation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">
      <main className="min-h-screen flex flex-col items-center justify-center text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <HomeAnimationLottie />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              안녕하세요! 성장하는
              <br className="hidden lg:inline-block" />
              국가대표 개발자 오예닮입니다.
            </h1>
            <p className="mb-8 leading-relaxed">TODO: 자기 소개 작성</p>
            <div className="flex justify-center">
              <Link href={"/projects"}>
                <button className="project_btn">프로젝트 확인</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
