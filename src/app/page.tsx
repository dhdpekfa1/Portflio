import AnimationLottie from "@/components/animation";

export default function Home() {
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <AnimationLottie />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              안녕하세요! 성장하는
              <br className="hidden lg:inline-block" />
              국가대표 개발자 오예닮입니다.
            </h1>
            <p className="mb-8 leading-relaxed">TODO: 자기 소개 작성</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-[#6ea368] border-0 py-2 px-6 focus:outline-none hover:bg-[#84c27d] rounded text-lg">
                프로젝트 확인
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
