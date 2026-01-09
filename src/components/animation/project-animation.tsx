"use client";

import dynamic from "next/dynamic";
import lottieJson from "/public/animation/default_project_animation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ProjectAnimationLottie = () => {
  return <Lottie animationData={lottieJson} loop />;
};

export { ProjectAnimationLottie };
