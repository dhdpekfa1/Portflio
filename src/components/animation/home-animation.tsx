"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
import lottieJson from "/public/animation/home_animation.json";

const HomeAnimationLottie = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export { HomeAnimationLottie };
