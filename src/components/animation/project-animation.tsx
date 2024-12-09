"use client";

import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "/public/animation/default_project_animation.json";

const ProjectAnimationLottie = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export { ProjectAnimationLottie };
