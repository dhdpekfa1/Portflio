'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { renderRichText, renderListItem } from '@/utils/render';

interface ProjectDialogProps {
  children: ReactNode;
  pageId: string;
  title: string;
  description: string;
  composition: string;
  links: { label: string; url: string; hidden?: boolean | undefined }[];
}

const ProjectDialog = ({
  children,
  pageId,
  title,
  description,
  composition,
  links,
}: ProjectDialogProps) => {
  const [blockData, setBlockData] = useState<Block[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await getBlockChildren(pageId);
    if (res) {
      setBlockData(res);
    }
  }, [pageId]);

  useEffect(() => {
    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen, fetchData]);

  const renderBlockContent = (block: Block) => {
    switch (block.type) {
      case 'image':
        console.log('ㅇㅇㅇ', block.image);

        return block.image?.external?.url ? (
          <a
            href={block.image.external.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              src={block.image.external.url}
              alt='Project Image'
              width={800}
              height={450}
              className='rounded-lg'
              priority
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
      default:
        return null;
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger className='flex items-center justify-start'>
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
              {links.map(({ label, url, hidden }) =>
                !hidden ? (
                  <Link
                    key={label}
                    href={url}
                    className='text-sm md:text-base text-second dark:text-second hover:text-second hover:font-semibold dark:hover:text-point'
                  >
                    👉🏻 {label}
                  </Link>
                ) : null
              )}
            </span>
          </DialogDescription>
          <Separator className='bg-dd dark:bg-gray-600' />
        </DialogHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            {blockData.length > 0 ? (
              blockData.map((block) => (
                <div key={block.id}>{renderBlockContent(block)}</div>
              ))
            ) : (
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-10 w-1/3' />
                <Skeleton className='h-[300px] w-full' />
                <Skeleton className='h-5 w-1/3' />
                <Skeleton className='h-5 w-2/3' />
                <Skeleton className='h-5 w-1/2' />
              </div>
            )}
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
