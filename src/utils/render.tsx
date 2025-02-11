import { Block } from '@/types/data';

// 텍스트 스타일 가져오는 함수
const getTextStyle = (type: string) => {
  switch (type) {
    case 'heading_1':
      return 'text-2xl font-bold';
    case 'heading_2':
      return 'text-xl font-semibold';
    case 'heading_3':
      return 'text-lg font-medium';
    default:
      return 'text-base';
  }
};

// Rich Text 블록 렌더링
const renderRichText = (block: Block, type: string) => {
  const richText = (block[type] as { rich_text: { plain_text: string }[] })
    ?.rich_text;
  return richText?.length > 0
    ? richText.map((text, index) => (
        <p key={index} className={getTextStyle(type)}>
          {text.plain_text}
        </p>
      ))
    : null;
};

// 리스트 아이템 렌더링
const renderListItem = (block: Block) => {
  const listBlock = block[block.type] as {
    rich_text: { plain_text: string }[];
  };
  return (
    <li key={block.id}>
      {listBlock.rich_text.map((text, index) => (
        <span key={index}>{text.plain_text}</span>
      ))}
    </li>
  );
};

export { renderRichText, renderListItem, getTextStyle };
