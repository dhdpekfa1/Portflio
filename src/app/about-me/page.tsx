import RandomPhrases from "@/components/about-me/RandomPhrases";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";

const AboutMe = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RandomPhrases />

      <Card className="w-[85%] h-[80%] m-8 bg-ef dark:bg-slate-800 border border-gray-200 overflow-scroll">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            운동 선수로서의 열정을 개발자로서의 새로운 도전에 쏟아붓고 있는
            오예닮입니다.
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xl font-semibold">
          <span>
            저는 초등학교 시절부터 2023년까지 핸드볼 선수로 활동하며, U-18
            대표팀 주장을 포함해 고참일 때는 항상 주장을 맡아 팀을 이끈 경험이
            있습니다. 이러한 경험을 통해 팀 내에서 중요한 역할을 수행하며
            리더십과 책임감을 배웠고, 누구보다 노력한 결과 키가 작아 신체적으로
            불리한 위치임에도 국가대표로 선발되는 영광을 누렸습니다.
            운동선수로서의 삶은 끊임없는 노력과 성장이 요구되는 환경이었고, 그
            과정에서 저는 남들보다 한 발 더 나아가기 위해 하루도 쉬지 않고
            훈련에 매진했습니다. 이러한 노력의 결과로 팀 내에서 항상 최고의
            체력을 유지할 수 있었고, 제 노력은 곧 성과로 이어졌습니다.
          </span>
          <span>
            하지만 무릎 부상으로 인해 여섯 번의 수술과 재활을 거쳐야 했고, 그
            과정에서 좌절감도 느꼈습니다. 그러나 포기하지 않고 끊임없는 재활과
            노력을 통해 여러 차례 복귀해 바로 주전으로 경기에 출전할 수
            있었습니다. 그럼에도 불구하고, 점차 무릎 상태가 악화되면서 더 이상
            운동을 지속할 수 없는 한계에 도달했습니다. 결국, 이러한 부상으로
            인해 운동선수로서의 경력을 마무리하게 되었고, 새로운 길을 모색하기로
            결심했습니다.
          </span>
          <span>
            그 과정에서 저는 배움과 성장의 즐거움을 느낄 수 있는 분야를 찾았고,
            개발이라는 직군이 그러한 특성을 지녔다는 사실을 알게 되었습니다.
            개발은 저에게 다시 한 번 성장할 수 있는 기회를 제공해 주었습니다.
            새로운 지식을 배우고 이를 프로젝트에 적용하며 발전하는 과정을 통해
            저는 개발에 매료되었습니다. 특히, 문제를 해결하고 결과물을
            만들어내는 과정은 운동선수 시절의 성취감을 다시 느끼게 해주었습니다.
            개발을 만나 다시 한번 배움과 성장의 기회를 얻을 수 있음에 감사하고,
            이를 통해 새로운 목표를 향해 나아갈 수 있음을 매우 즐겁게 생각하고
            있습니다. 프로젝트 경험을 통해 개발자로서의 역량을 키우는 동시에,
            협업의 중요성과 사용자 중심적인 사고를 배우며 한 단계씩 성장하고
            있습니다.
          </span>
          <span>
            저는 항상 팀으로 생활하며 협업과 소통의 중요성을 깊이 배웠습니다.
            주장을 맡으면서 리더십의 책임감과 중요성을 몸소 느낄 수 있었고,
            동시에 팔로워로서 팀원들과의 신뢰와 조화를 이루는 것이 얼마나
            중요한지도 깨달았습니다. 이러한 경험은 저를 리더십과 팔로워십을 모두
            갖춘 균형 잡힌 사람으로 성장시켰으며, 앞으로의 개발 과정에서도
            팀과의 협업에서 강점을 발휘할 수 있는 기반이 되리라 확신합니다.
          </span>
          <span>
            저는 핸드볼 선수로서 길러온 끈기와 도전 정신을 바탕으로 개발자로서의
            새로운 목표를 향해 나아가고 있습니다. 과거의 경험이 저를 강인하게
            만들었듯이, 앞으로도 배움의 즐거움과 성장을 통해 더 나은 개발자가
            되기 위해 노력하겠습니다. 감사합니다.
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutMe;
