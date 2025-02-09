"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
  Card,
  CardContent,
} from "@/components/ui";

const videoUrls = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
];

const VideoCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // CarouselApi 이벤트 핸들러
  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      const index = carouselApi?.selectedScrollSnap();
      if (index !== undefined) {
        setActiveIndex(index);
      }
    };

    carouselApi.on("select", handleSelect); // 슬라이드 변경 이벤트
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  // 활성화된 슬라이드에 따라 동영상 재생/멈춤
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="flex items-center justify-center w-[85%] h-screen gap-2">
      <Carousel
        setApi={(api) => setCarouselApi(api)}
        className="w-full max-w-xl"
      >
        <CarouselContent>
          {videoUrls.map((videoUrl, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <video className="w-full h-full" controls src={videoUrl} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
