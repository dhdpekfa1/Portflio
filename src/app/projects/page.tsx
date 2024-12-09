import React from "react";
import ProjectItem from "@/components/project/project-item";
import { getDataList } from "@/apis/data";
import { NotionPage } from "@/types/data";

const ProjectPage = async () => {
  const data: NotionPage[] = await getDataList();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-8">
      <h1 className="text-2xl font-bold ml-auto mr-8">
        프로젝트: <span className="text-primary">{data.length}</span>개
      </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:w-full gap-8 m-6 py-10 mb-8">
        {data.map((project) => (
          <ProjectItem data={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
