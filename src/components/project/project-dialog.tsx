"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  CardContent,
  CardHeader,
} from "@/components/ui";
import { getBlockChildren } from "@/apis/data";
import { Block } from "@/types/data";

const ProjectDialog = ({
  children,
  pageId,
}: {
  children: ReactNode;
  pageId: string;
}) => {
  const [blockData, setBlockData] = useState<Block[]>();

  useEffect(() => {
    fetchData();
  }, [pageId]);

  const fetchData = async () => {
    const res = await getBlockChildren(pageId);
    setBlockData(res);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-start">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-screen w-fit m-8 bg-ef dark:bg-slate-800 border border-gray-200">
        <CardHeader>
          <DialogTitle className="text-lg font-bold text-second">
            {/* {title} */}
          </DialogTitle>
          {/* <CardDescription>{description}</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <Image
                src="/images/kakao_qr.png"
                alt="Kakao QR Code"
                width={400}
                height={400}
                style={{ width: 180, height: "auto", borderRadius: 12 }}
              />
            </div>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
