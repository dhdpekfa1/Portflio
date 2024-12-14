import { HomeAnimationLottie } from "@/components/animation";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center justify-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <HomeAnimationLottie />
          </div>
          <div className="w-fit lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              안녕하세요🙇🏻‍♀️
            </h1>
            <h2 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">
              국가대표 개발자 오예닮입니다.
            </h2>
            <span className="leading-relaxed dark:text-[#bbb]">
              저는 배움을 좋아하고 성장하는 것에 보람을 느끼는 개발자입니다.
            </span>
            <span className="leading-relaxed dark:text-[#bbb]">
              잦은 부상과 수술로 운동 선수로서 실력의 한계를 마주했을 때,
            </span>
            <span className=" mb-8 leading-relaxed dark:text-[#bbb]">
              개발이라는 직군을 만나고 기쁘지 않을 수 없었습니다.
            </span>
            <div className="flex justify-center">
              <Link href={"/projects"}>
                <button className="project_btn">프로젝트 확인</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
