import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { RandomPhrases } from '@/components/about-me';
import { getAboutMePage, getBlockChildrenFromNotion } from '@/apis/data';
import { renderNotionBlock } from '@/utils/notion-block-renderer';

const getPageTitle = (page: {
  properties?: { Name?: { title?: { plain_text?: string }[] } };
}) =>
  page.properties?.Name?.title?.[0]?.plain_text?.trim() || '';

const AboutMe = async () => {
  const introPage = await getAboutMePage();
  const blocks = introPage
    ? await getBlockChildrenFromNotion(introPage.id)
    : [];

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <RandomPhrases />

      <Card className='w-[85%] h-[80%] m-8 bg-zinc-100 dark:bg-zinc-800 border border-gray-200/20 overflow-scroll'>
        <CardHeader>
          <CardTitle className='text-lg md:text-lg lg:text-xl font-bold'>
            {introPage ? getPageTitle(introPage) : '자기소개'}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 text-base md:text-lg lg:text-xl'>
          {blocks.length > 0 ? (
            blocks.map((block) => (
              <div key={block.id}>
                {renderNotionBlock(block, { imageAlt: 'About me image' })}
              </div>
            ))
          ) : (
            <p className='text-base md:text-lg text-zinc-500 dark:text-zinc-400'>
              노션에서 `자기소개` 페이지를 찾지 못했거나, 본문 블록이 비어
              있습니다.
            </p>
          )}
        </CardContent>
      </Card>
      {/* <MoreButton /> */}
    </div>
  );
};

export default AboutMe;
