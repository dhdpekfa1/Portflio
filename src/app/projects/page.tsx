import React from 'react';
import { ProjectItem } from '@/components/project';
import { getDataList } from '@/apis/data';
import { NotionPage } from '@/types/data';

const ProjectPage = async () => {
  const data: NotionPage[] = await getDataList();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4'>
      <h1 className='text-lg md:text-xl lg:text-2xl font-bold ml-auto mr-8 mt-6 lg:mt-0'>
        프로젝트: <span className='text-point'>{data.length}</span>개
      </h1>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:w-full gap-6 lg:gap-8 m-6 pb-10 mb-8 items-center justify-center'>
        {data.reverse().map((project) => (
          <ProjectItem key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
