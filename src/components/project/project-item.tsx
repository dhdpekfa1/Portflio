import Link from "next/link";
import Image from "next/image";
import { NotionPage } from "@/types/data";
import { ProjectAnimationLottie } from "@/components/animation";
import { calculatePeriod } from "@/utils/helper";

const ProjectItem = async ({ data }: { data: NotionPage }) => {
  const title = data.properties.Name.title?.[0]?.plain_text || "Untitled";
  const coverUrl = data.cover?.file?.url || data.cover?.external?.url || "";
  const githubUrl = data.properties.Github?.url || "#";
  const description =
    data.properties.Description.rich_text?.[0]?.plain_text || "No description";
  const tags = data.properties.tags.multi_select;
  const startDate = data.properties.WorkPeriod.date?.start;
  const endDate = data.properties.WorkPeriod.date?.end;

  return (
    <div className="project_card" key={data.id}>
      <div className="bg-black rounded-t-xl w-full h-[300px] overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt="project img"
            width={1600}
            height={900}
            quality={100}
            className="rounded-t-xl object-cover"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        ) : (
          <ProjectAnimationLottie />
        )}
      </div>
      <div className="w-full flex flex-col p-4 gap-2">
        <h2 className="font-bold text-3xl">{title}</h2>
        <h3 className="text-xl">{description}</h3>
        <Link
          href={githubUrl}
          className="w-fit text-gray-800 dark:text-gray-300 hover:text-secondary dark:hover:text-primary hover:scale-105"
        >
          github 바로가기
        </Link>
        <span className="font-medium flex items-center gap-2 text-gray-500 dark:text-gray-500">
          작업 기간: {startDate} ~ {endDate} (
          {calculatePeriod(startDate, endDate)}일)
        </span>

        <div className="flex items-start mt-2 gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="bg-secondary rounded-lg px-2 py-1">
              <p className="text-xs text-white">{tag.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
