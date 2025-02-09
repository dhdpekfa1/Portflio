'use client';

import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const RandomPhrases = () => {
  const phrases = [
    '💪 성실함을 바탕으로 꾸준히 성장하는',
    '🤔 사용자 경험을 생각하는',
    '🤾🏻‍♀️ 국가대표 출신',
    '💡 문제를 해결하는 창의적인',
    '🎯 포기하지 않는 근성과 정신력을 가진',
    '💪 끈기와 성실함을 갖춘',
    '🔥 열정과 노력으로 나아가는',
    '🧠 배움을 즐기고 성장하는',
    '🚀 목표를 이루는 추진력 있는',
  ];

  const [displayedPhrase, setDisplayedPhrase] = useState(phrases[0]);

  const handleRandomize = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setDisplayedPhrase('');
    setTimeout(() => {
      setDisplayedPhrase(randomPhrase);
    }, 100);
  };

  return (
    <div className='w-full flex items-center justify-center gap-4'>
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-three dark:text-white flex gap-3 max-sm:flex-col max-sm:items-center'>
        안녕하세요
        <span className='text-xl md:text-2xl lg:text-3xl font-bold text-second dark:text-point '>
          <TypeAnimation
            key={displayedPhrase}
            sequence={[displayedPhrase, 1000]}
            wrapper='span'
            cursor={true}
            repeat={0}
            className='w-fit'
          />
        </span>
        개발자 오예닮입니다.
      </h2>
      <button onClick={handleRandomize} className='project_btn'>
        변경
      </button>
    </div>
  );
};

export { RandomPhrases };
