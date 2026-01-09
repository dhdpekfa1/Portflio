"use client";

import dynamic from "next/dynamic";
import lottieJson from "/public/animation/home_animation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const HomeAnimationLottie = () => {
  return <Lottie animationData={lottieJson} loop />;
};

export { HomeAnimationLottie };
