import React from "react";
import ProjectItem from "@/components/project/project-item";
import { getDataList } from "@/apis/data";
import { NotionPage } from "@/types/data";

const ProjectPage = async () => {
  const data: NotionPage[] = await getDataList();
  return (
    <div>
      <h1>프로젝트 {data.length}개</h1>
      {data.map((project) => (
        <ProjectItem data={project} />
      ))}
    </div>
  );
};

export default ProjectPage;
