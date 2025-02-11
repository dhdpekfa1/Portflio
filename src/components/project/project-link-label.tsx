'use client';

import React from 'react';
import Link from 'next/link';

interface LinkLabelProps {
  label: string;
  url: string;
  hidden?: boolean;
  className: string;
  use: 'item' | 'dialog';
}

// 포트폴리오 링크 클릭 제어
const LinkLabel = ({ label, url, hidden, className, use }: LinkLabelProps) => {
  const handleLinkClick = (event: React.MouseEvent) => {
    if (url.includes('ollin-portflio')) {
      event.preventDefault();
    }
  };

  // dialog에서만 이모지 표시
  let displayLabel = label;

  if (url.includes('ollin-portflio')) {
    displayLabel = use === 'dialog' ? '☝🏻 현재 주소' : '현재 주소';
  } else if (use === 'dialog') {
    displayLabel = `👉🏻 ${label}`;
  }

  // 공간을 차지 + 가려짐을 위해 invisible 추가
  const finalClassName = `${className} ${hidden ? 'invisible' : ''}`;

  return (
    <Link href={url} onClick={handleLinkClick} className={finalClassName}>
      {displayLabel}
    </Link>
  );
};

export { LinkLabel };
