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

interface ProjectDialogProps {
  children: ReactNode;
  pageId: string;
  title: string;
  description: string;
  githubUrl: string;
  deployment: string;
  preview: string;
}

const ProjectDialog = ({
  children,
  pageId,
  title,
  description,
  githubUrl,
  deployment,
  preview,
}: ProjectDialogProps) => {
  const [blockData, setBlockData] = useState<Block[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await getBlockChildren(pageId);
    if (!res) {
      return;
    }
    setBlockData(res);
  }, [pageId]);

  useEffect(() => {
    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen, fetchData]);

  const renderBlockContent = (block: Block) => {
    switch (block.type) {
      case 'image':
        if (block.image?.external?.url) {
          return (
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
          );
        }
        break;
      case 'paragraph':
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        const richText = (
          block[block.type] as { rich_text: { plain_text: string }[] }
        )?.rich_text;
        if (richText?.length > 0) {
          return richText.map((text, index) => (
            <p key={index} className={getTextStyle(block.type)}>
              {text.plain_text}
            </p>
          ));
        }
        break;

      case 'bulleted_list_item':
      case 'numbered_list_item': {
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
      }
      default:
        return null;
    }
  };

  const getTextStyle = (type: string) => {
    switch (type) {
      case 'heading_1':
        return 'text-xl md:text-3xl font-bold mt-6 mb-2';
      case 'heading_2':
        return 'text-xl md:text-2xl font-semibold mt-6 mb-2';
      case 'heading_3':
        return 'text-lg md:text-xl font-medium mt-4 mb-2';
      case 'paragraph':
        return 'text-sm md:text-base';
      default:
        return 'text-gray-500';
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
          </DialogTitle>
          <DialogDescription className='flex flex-col text-gray-500 dark:text-gray-400 -mt-6 text-sm md:text-base'>
            {description}
            <div className='flex gap-4 overflow-x-scroll items-center justify-center md:justify-start mt-2'>
              <Link
                href={githubUrl}
                className='text-sm md:text-base text-second dark:text-second hover:text-second hover:font-semibold dark:hover:text-point'
              >
                👉🏻 github
              </Link>
              <Link
                href={deployment}
                className='text-sm md:text-base text-second dark:text-second hover:text-second hover:font-semibold dark:hover:text-point'
              >
                👉🏻 배포 주소
              </Link>
              <Link
                href={preview ? preview : ''}
                className={`text-sm md:text-base text-second dark:text-second hover:text-second hover:font-semibold dark:hover:text-point ${
                  !preview ? 'hidden' : ''
                }`}
              >
                👉🏻 시연 영상
              </Link>
            </div>
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
