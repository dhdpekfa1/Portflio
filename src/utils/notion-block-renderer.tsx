import { ReactNode } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui';
import { Block } from '@/types/data';
import {
  renderCodeBlock,
  renderListItem,
  renderQuoteBlock,
  renderRichText,
  renderTodoBlock,
} from '@/utils/render';

interface RenderNotionBlockOptions {
  imageAlt?: string;
}

const getBlockChildren = (block: Block): Block[] => {
  const blockData = block[block.type] as { children?: Block[] } | undefined;
  return Array.isArray(blockData?.children) ? blockData.children : [];
};

const renderToggleBlock = (
  block: Block,
  options: RenderNotionBlockOptions,
): ReactNode => {
  const toggleBlock = block.toggle as
    | {
        rich_text?: unknown[];
      }
    | undefined;
  const hasChildren = block.has_children;
  const children = getBlockChildren(block);

  const titleBlock: Block = {
    ...block,
    type: 'paragraph',
    paragraph: {
      color: 'default',
      rich_text: (toggleBlock?.rich_text ?? []) as NonNullable<
        Block['paragraph']
      >['rich_text'],
    },
  };

  return (
    <details className='rounded-md border border-zinc-200/70 dark:border-zinc-700 p-3'>
      <summary className='cursor-pointer list-none font-semibold text-sm md:text-base'>
        {renderRichText(titleBlock, 'paragraph')}
      </summary>
      <div className='mt-3 ml-1 flex flex-col gap-2'>
        {children.length > 0 ? (
          children.map((child) => (
            <div key={child.id}>{renderNotionBlock(child, options)}</div>
          ))
        ) : hasChildren ? (
          <p className='text-xs md:text-sm text-zinc-500 dark:text-zinc-400'>
            토글 하위 블록을 불러오는 중입니다.
          </p>
        ) : null}
      </div>
    </details>
  );
};

export const renderNotionBlock = (
  block: Block,
  options: RenderNotionBlockOptions = {},
): ReactNode => {
  const imageUrl = block.image?.external?.url || block.image?.file?.url;

  switch (block.type) {
    case 'image':
      return imageUrl ? (
        <a href={imageUrl} target='_blank' rel='noopener noreferrer'>
          <Image
            src={imageUrl}
            alt={options.imageAlt || 'Notion image'}
            width={800}
            height={450}
            className='rounded-lg'
            sizes='(max-width: 768px) 95vw, 80vw'
          />
        </a>
      ) : null;
    case 'paragraph':
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return renderRichText(block, block.type);
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return renderListItem(block);
    case 'quote':
      return renderQuoteBlock(block);
    case 'code':
      return renderCodeBlock(block);
    case 'to_do':
      return renderTodoBlock(block);
    case 'toggle':
      return renderToggleBlock(block, options);
    case 'divider':
      return <Separator className='my-2 bg-zinc-300 dark:bg-zinc-600' />;
    default:
      return null;
  }
};
