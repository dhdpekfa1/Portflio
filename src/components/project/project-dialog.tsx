'use client';

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  CardContent,
  DialogHeader,
  DialogDescription,
  Separator,
  Skeleton,
} from '@/components/ui';
import { getBlockChildren } from '@/apis/data';
import { Block } from '@/types/data';
import {
  renderRichText,
  renderListItem,
  renderQuoteBlock,
  renderCodeBlock,
  renderTodoBlock,
} from '@/utils/render';
import { LinkLabel } from '@/components/project';

interface ProjectDialogProps {
  children: ReactNode;
  pageId: string;
  title: string;
  description: string;
  composition: string;
  links: { label: string; url: string; hidden?: boolean | undefined }[];
}

const blockDataCache = new Map<string, Block[]>();
const blockDataPending = new Map<string, Promise<Block[]>>();

const fetchBlockChildrenWithCache = async (pageId: string): Promise<Block[]> => {
  const cached = blockDataCache.get(pageId);
  if (cached) return cached;

  const pending = blockDataPending.get(pageId);
  if (pending) return pending;

  const request = getBlockChildren(pageId)
    .then((res) => {
      const data = res || [];
      blockDataCache.set(pageId, data);
      blockDataPending.delete(pageId);
      return data;
    })
    .catch((error) => {
      blockDataPending.delete(pageId);
      throw error;
    });

  blockDataPending.set(pageId, request);
  return request;
};

const ProjectDialog = ({
  children,
  pageId,
  title,
  description,
  composition,
  links,
}: ProjectDialogProps) => {
  const [blockData, setBlockData] = useState<Block[]>(() => {
    return blockDataCache.get(pageId) || [];
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(() => blockDataCache.has(pageId));
  const prefetchRequestedRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (hasFetched) return;

    if (isMountedRef.current) {
      setIsLoading(true);
    }
    try {
      const data = await fetchBlockChildrenWithCache(pageId);
      if (!isMountedRef.current) return;

      setBlockData(data);
      setHasFetched(true);
    } catch (error) {
      prefetchRequestedRef.current = false;
      console.error('Error prefetching block data:', error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [hasFetched, pageId]);

  useEffect(() => {
    if (isDialogOpen) {
      void fetchData();
    }
  }, [isDialogOpen, fetchData]);

  const prefetchIfNeeded = useCallback(() => {
    if (prefetchRequestedRef.current || hasFetched) return;
    prefetchRequestedRef.current = true;
    void fetchData();
  }, [fetchData, hasFetched]);

  const renderBlockContent = (block: Block) => {
    switch (block.type) {
      case 'image':
        return block.image?.external?.url || block.image?.file?.url ? (
          <a
            href={block.image?.external?.url || block.image?.file?.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              src={block.image?.external?.url || block.image?.file?.url || ''}
              alt='Project Image'
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
      case 'divider':
        return <Separator className='my-2 bg-zinc-300 dark:bg-zinc-600' />;
      default:
        return null;
    }
  };

  const renderedBlocks = useMemo(() => {
    return blockData.map((block) => (
      <div key={block.id}>{renderBlockContent(block)}</div>
    ));
  }, [blockData]);

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className='flex items-center justify-start'
        onPointerEnter={prefetchIfNeeded}
        onPointerDown={prefetchIfNeeded}
        onFocus={prefetchIfNeeded}
      >
        {children}
      </DialogTrigger>
      <DialogContent className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[80%] max-w-[95%] md:max-w-[80%] bg-ef dark:bg-zinc-800 border border-gray-200/20 overflow-scroll rounded-sm'>
        <DialogHeader>
          <DialogTitle className='mb-2 text-2xl md:text-3xl font-bold text-second dark:text-second'>
            {title}
            <p className='text-gray-600 dark:text-gray-300 text-sm md:text-base mt-2'>
              {composition}
            </p>
          </DialogTitle>
          <DialogDescription className='flex flex-col text-gray-500 dark:text-gray-400 text-sm md:text-base'>
            {description}
            <span className='flex gap-4 overflow-x-scroll items-center justify-center md:justify-start md:mt-1'>
              {links.map((link) => (
                <LinkLabel
                  key={link.label}
                  label={link.label}
                  url={link.url}
                  hidden={link.hidden}
                  use={'dialog'}
                  className={`text-sm md:text-base text-second dark:text-second hover:text-second hover:font-semibold dark:hover:text-point`}
                />
              ))}
            </span>
          </DialogDescription>
          <Separator className='bg-dd dark:bg-gray-600' />
        </DialogHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            {blockData.length > 0 ? (
              renderedBlocks
            ) : isLoading || !hasFetched ? (
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-10 w-1/3' />
                <Skeleton className='h-[300px] w-full' />
                <Skeleton className='h-5 w-1/3' />
                <Skeleton className='h-5 w-2/3' />
                <Skeleton className='h-5 w-1/2' />
              </div>
            ) : (
              <p className='text-sm md:text-base text-zinc-500'>
                표시할 상세 콘텐츠가 없습니다.
              </p>
            )}
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export { ProjectDialog };
