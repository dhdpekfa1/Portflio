"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
import lottieJson from "/public/animation/default_project_animation.json";

const ProjectAnimationLottie = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export { ProjectAnimationLottie };
