"use client";

import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const RandomPhrases = () => {
  const phrases = [
    "아좌좟 열정 넘치는",
    "끊임없이 배우는",
    "언제나 노력하는",
    "사용자 경험을 생각하는",
    "국가대표 출신",
  ];

  const [displayedPhrase, setDisplayedPhrase] = useState(phrases[0]);

  const handleRandomize = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setDisplayedPhrase("");
    setTimeout(() => {
      setDisplayedPhrase(randomPhrase);
    }, 100);
  };

  return (
    <div className="w-[85%] flex items-center justify-start gap-4">
      <h2 className="text-3xl font-bold text-three dark:text-white flex gap-3 max-sm:flex-col">
        안녕하세요
        <span className="text-3xl font-bold text-second dark:text-point w-[300px]">
          <TypeAnimation
            key={displayedPhrase}
            sequence={[displayedPhrase, 1000]}
            wrapper="span"
            cursor={true}
            repeat={0}
          />
        </span>
        개발자 오예닮입니다.
      </h2>
      <button onClick={handleRandomize} className="project_btn">
        변경
      </button>
    </div>
  );
};

export { RandomPhrases };
