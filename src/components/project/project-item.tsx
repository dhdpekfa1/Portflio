import Link from "next/link";
import Image from "next/image";
import { NotionPage } from "@/types/data";
import { ProjectAnimationLottie } from "@/components/animation";

const ProjectItem = async ({ data }: { data: NotionPage }) => {
  const title = data.properties.Name.title?.[0]?.plain_text || "Untitled";
  const coverUrl = data.cover?.file?.url || data.cover?.external?.url || "";
  const githubUrl = data.properties.Github?.url || "#";
  const description =
    data.properties.Description.rich_text?.[0]?.plain_text || "No description";

  return (
    <div className="project_item" key={data.id}>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt="project img"
          layout="responsive"
          width={16}
          height={9}
          objectFit="none"
          quality={100}
          className="rounded-t-xl"
        />
      ) : (
        <ProjectAnimationLottie />
      )}
      <h2 className="font-semibold text-xl">{title}</h2>
      <p>{description}</p>
      <Link href={githubUrl}>github 바로가기</Link>
    </div>
  );
};

export default ProjectItem;
