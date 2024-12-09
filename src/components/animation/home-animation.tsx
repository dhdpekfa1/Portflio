"use client";

import dynamic from "next/dynamic";
import lottieJson from "/public/animation/home_animation.json";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const HomeAnimationLottie = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export { HomeAnimationLottie };
