import Image from 'next/image';
import { NotionPage } from '@/types/data';
import { ProjectAnimationLottie } from '@/components/animation';
import { calculatePeriod } from '@/utils/helper';
import { ProjectDialog, LinkLabel } from '@/components/project';

const ProjectItem = async ({ data }: { data: NotionPage }) => {
  const title = data.properties.Name.title?.[0]?.plain_text || 'Untitled';
  const coverUrl = data.cover?.file?.url || data.cover?.external?.url || '';
  const githubUrl = data.properties.Github?.url || '#';
  const description =
    data.properties.Description.rich_text?.[0]?.plain_text || 'No description';
  const tags = data.properties.tags.multi_select;
  const startDate = data.properties.WorkPeriod.date?.start;
  const endDate = data.properties.WorkPeriod.date?.end;
  const deployment = data.properties.deploymentURL.url;
  const preview = data.properties.preview.url
    ? data.properties.preview.url
    : null;
  const composition = data.properties.composition.rich_text[0].plain_text;

  const links = [
    { label: 'GitHub', url: githubUrl },
    { label: '배포 주소', url: deployment },
    { label: '시연 영상', url: preview || '', hidden: !preview },
  ];

  return (
    <ProjectDialog
      pageId={data.id}
      title={title}
      description={description}
      composition={composition}
      links={links}
    >
      <div className='project_card w-full' key={data.id}>
        <div className='bg-black rounded-t-xl w-full md:h-[300px] overflow-hidden'>
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt='project img'
              width={1600}
              height={900}
              quality={100}
              className='rounded-t-xl object-cover'
              style={{
                width: '100%',
                height: 'auto',
              }}
              priority
            />
          ) : (
            <ProjectAnimationLottie />
          )}
        </div>
        <div className='w-full flex flex-col p-4 gap-2 items-start'>
          <h2 className='font-bold text-2xl md:text-3xl truncate w-full max-w-full text-second dark:text-point text-left'>
            {title}
          </h2>
          <h3 className='text-base md:text-xl truncate w-full max-w-full text-left text-zinc-500'>
            {description}
          </h3>
          <h3 className='text-sm md:text-base font-semibold truncate w-full max-w-full text-left text-zinc-600 dark:text-zinc-300'>
            <span>구성: </span>
            {composition}
          </h3>
          {links.map((link) => (
            <LinkLabel
              key={link.label}
              label={link.label}
              url={link.url}
              className={`text-base md:text-lg text-zinc-600 dark:text-zinc-400 hover:text-second hover:font-semibold dark:hover:text-point hover:scale-105`}
              hidden={link.hidden}
              use={'item'}
            />
          ))}

          <span className='text-sm md:text-base font-medium flex items-start gap-2 text-zinc-500 dark:text-zinc-500 truncate w-full max-w-full overflow-x-scroll'>
            작업 기간: {startDate} ~ {endDate}(
            {calculatePeriod(startDate, endDate)}일)
          </span>
          <div className='max-w-full flex flex-nowrap items-start mt-2 gap-2 overflow-x-scroll whitespace-nowrap'>
            {tags.map((tag) => (
              <div
                key={tag.id}
                className='bg-second rounded-lg px-2 py-1 flex-shrink-0'
              >
                <p className='text-xs text-white'>{tag.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProjectDialog>
  );
};

export { ProjectItem };
