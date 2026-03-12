import { ReactNode } from 'react';
import { Block } from '@/types/data';

// 텍스트 스타일 가져오는 함수
const getTextStyle = (type: string) => {
  switch (type) {
    case 'heading_1':
      return 'text-xl md:text-2xl font-bold mt-3 md:mt-5';
    case 'heading_2':
      return 'text-lg md:text-xl font-semibold mt-3 md:mt-5';
    case 'heading_3':
      return 'text-base md:text-lg font-semibold mt-3 md:mt-5';
    default:
      return 'text-sm md:text-base';
  }
};

type NotionAnnotation = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
};

type NotionRichText = {
  type?: string;
  plain_text?: string;
  href?: string | null;
  annotations?: NotionAnnotation;
  text?: {
    link?: {
      url: string;
    } | null;
  };
};

const getColorClassName = (color?: string) => {
  if (!color || color === 'default') return '';

  const colorClassMap: Record<string, string> = {
    gray: 'text-gray-500 dark:text-gray-400',
    brown: 'text-amber-700 dark:text-amber-400',
    orange: 'text-orange-500',
    yellow: 'text-yellow-500',
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
    red: 'text-red-500',
    gray_background: 'bg-gray-200 dark:bg-gray-700',
    brown_background: 'bg-amber-100 dark:bg-amber-900/50',
    orange_background: 'bg-orange-100 dark:bg-orange-900/50',
    yellow_background: 'bg-yellow-100 dark:bg-yellow-900/50',
    green_background: 'bg-green-100 dark:bg-green-900/50',
    blue_background: 'bg-blue-100 dark:bg-blue-900/50',
    purple_background: 'bg-purple-100 dark:bg-purple-900/50',
    pink_background: 'bg-pink-100 dark:bg-pink-900/50',
    red_background: 'bg-red-100 dark:bg-red-900/50',
  };

  return colorClassMap[color] ?? '';
};

const getBlockRichText = (block: Block, type: string): NotionRichText[] => {
  const blockContent = block[type] as { rich_text?: NotionRichText[] } | undefined;
  return blockContent?.rich_text ?? [];
};

const renderInlineRichText = (text: NotionRichText, index: number) => {
  const plainText = text.plain_text ?? '';
  const annotations = text.annotations ?? {};
  const colorClassName = getColorClassName(annotations.color);
  const link = text.text?.link?.url || text.href || null;

  let node: ReactNode = plainText;

  if (annotations.code) {
    node = (
      <code className='px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-xs md:text-sm'>
        {node}
      </code>
    );
  }

  if (annotations.bold) node = <strong>{node}</strong>;
  if (annotations.italic) node = <em>{node}</em>;
  if (annotations.underline) node = <u>{node}</u>;
  if (annotations.strikethrough) node = <s>{node}</s>;

  if (link) {
    node = (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 hover:underline'
      >
        {node}
      </a>
    );
  }

  return (
    <span
      key={`rich-text-${index}`}
      className={`whitespace-pre-wrap break-words ${colorClassName}`.trim()}
    >
      {node}
    </span>
  );
};

const renderInlineRichTextList = (richText: NotionRichText[]) =>
  richText.map(renderInlineRichText);

// Rich Text 블록 렌더링
const renderRichText = (block: Block, type: string) => {
  const richText = getBlockRichText(block, type);
  if (richText.length === 0) return null;

  const className = `${getTextStyle(type)} whitespace-pre-wrap break-words`;
  const content = renderInlineRichTextList(richText);

  switch (type) {
    case 'heading_1':
      return <h1 className={className}>{content}</h1>;
    case 'heading_2':
      return <h2 className={className}>{content}</h2>;
    case 'heading_3':
      return <h3 className={className}>{content}</h3>;
    default:
      return <p className={className}>{content}</p>;
  }
};

// 리스트 아이템 렌더링
const renderListItem = (block: Block) => {
  const listBlock = block[block.type] as { rich_text?: NotionRichText[] };
  const richText = listBlock?.rich_text ?? [];
  const isNumberedList = block.type === 'numbered_list_item';

  return (
    <li
      key={block.id}
      className={`ml-5 whitespace-pre-wrap break-words ${
        isNumberedList ? 'list-decimal' : 'list-disc'
      }`}
    >
      {renderInlineRichTextList(richText)}
    </li>
  );
};

const renderQuoteBlock = (block: Block) => {
  const richText = getBlockRichText(block, 'quote');
  if (richText.length === 0) return null;

  return (
    <blockquote className='border-l-4 border-zinc-400 dark:border-zinc-600 pl-3 text-sm md:text-base whitespace-pre-wrap break-words'>
      {renderInlineRichTextList(richText)}
    </blockquote>
  );
};

const renderCodeBlock = (block: Block) => {
  const richText = getBlockRichText(block, 'code');
  if (richText.length === 0) return null;

  return (
    <pre className='rounded-md bg-zinc-900 text-zinc-100 p-3 overflow-x-auto text-xs md:text-sm whitespace-pre-wrap break-words'>
      <code>{renderInlineRichTextList(richText)}</code>
    </pre>
  );
};

const renderTodoBlock = (block: Block) => {
  const todoBlock = block.to_do as
    | {
        checked?: boolean;
        rich_text?: NotionRichText[];
      }
    | undefined;
  const richText = todoBlock?.rich_text ?? [];
  if (richText.length === 0) return null;

  return (
    <div className='flex items-start gap-2 text-sm md:text-base whitespace-pre-wrap break-words'>
      <input type='checkbox' checked={Boolean(todoBlock?.checked)} readOnly />
      <span>{renderInlineRichTextList(richText)}</span>
    </div>
  );
};

export {
  renderRichText,
  renderListItem,
  renderQuoteBlock,
  renderCodeBlock,
  renderTodoBlock,
  getTextStyle,
};
