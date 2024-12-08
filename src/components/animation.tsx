"use client";

import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "/public/animation/home_animation.json";

export default function AnimationLottie() {
  return <Lottie loop animationData={lottieJson} play />;
}
