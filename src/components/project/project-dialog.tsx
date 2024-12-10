"use client";

import { ReactNode, useEffect, useState } from "react";
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
import Image from "next/image";

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

  useEffect(() => {
    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    console.log("Updated blockData:", blockData);
  }, [blockData]);

  const fetchData = async () => {
    const res = await getBlockChildren(pageId);
    if (!res) {
      console.error("page-dialog :", res);
      return;
    }
    setBlockData(res);
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
      case "image":
        return "w-[80%]";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Dialog onOpenChange={() => setIsDialogOpen(true)}>
      <DialogTrigger className="flex items-center justify-start">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[80%] max-w-[80%] m-8 bg-ef dark:bg-slate-800 border border-gray-200 overflow-scroll">
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
                <div key={block.id}>
                  {block.type === "image" && block.image?.external?.url ? (
                    <a
                      href={block.image.external.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={block.image.external.url}
                        alt="Project Image"
                        width={800} // 원하는 크기로 설정
                        height={450} // 원하는 크기로 설정
                        className="rounded-lg"
                        priority // LCP를 위한 우선 로드
                      />
                    </a>
                  ) : (
                    block[block.type]?.rich_text?.length > 0 &&
                    block[block.type].rich_text.map((text, index) => (
                      <p key={index} className={getTextStyle(block.type)}>
                        {text.plain_text}
                      </p>
                    ))
                  )}
                </div>
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
