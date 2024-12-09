"use client";

import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "/public/animation/home_animation.json";

const HomeAnimationLottie = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export { HomeAnimationLottie };
