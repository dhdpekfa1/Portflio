"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  CardContent,
  DialogHeader,
  DialogDescription,
  Separator,
} from "@/components/ui";
import { getBlockChildren } from "@/apis/data";
import { Block } from "@/types/data";

interface ProjectDialogProps {
  children: ReactNode;
  pageId: string;
  title: string;
  description: string;
}

const ProjectDialog = ({
  children,
  pageId,
  title,
  description,
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
      case "image":
        if (block.image?.external?.url) {
          return (
            <a
              href={block.image.external.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={block.image.external.url}
                alt="Project Image"
                width={800}
                height={450}
                className="rounded-lg"
                priority
              />
            </a>
          );
        }
        break;
      case "paragraph":
      case "heading_1":
      case "heading_2":
      case "heading_3":
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

      case "bulleted_list_item":
      case "numbered_list_item": {
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
      case "heading_1":
        return "text-3xl font-bold mt-6 mb-2";
      case "heading_2":
        return "text-2xl font-semibold mt-6 mb-2";
      case "heading_3":
        return "text-xl font-medium mt-4 mb-2";
      case "paragraph":
        return "text-base";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex items-center justify-start">
        {children}
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[80%] max-w-[80%] bg-ef dark:bg-slate-800 border border-gray-200 overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-2 text-3xl font-bold text-second dark:text-second">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400 -mt-6">
            {description}
          </DialogDescription>
          <Separator className="bg-dd dark:bg-gray-600" />
        </DialogHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {blockData.length > 0 ? (
              blockData.map((block) => (
                <div key={block.id}>{renderBlockContent(block)}</div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
