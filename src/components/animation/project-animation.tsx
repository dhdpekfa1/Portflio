"use client";

import dynamic from "next/dynamic";
import lottieJson from "/public/animation/default_project_animation.json";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const ProjectAnimationLottie = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export { ProjectAnimationLottie };
