import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='body-font'>
      <div className='footer'>
        <div className='container px-5 py-6 mx-auto flex items-center justify-center sm:flex-row flex-col'>
          <a className='flex title-font font-medium items-center md:justify-start justify-center text-gray-900'>
            <span className='text-base md:text-lg'>Ollin Portfolio</span>
          </a>
          <p className='text-xs md:text-sm text-gray-500 ml-3'>
            © 2025 -
            <a
              href='https://twitter.com/knyttneve'
              rel='noopener noreferrer'
              className='text-gray-600 ml-1 md:ml-2'
              target='_blank'
            >
              @dhdpekfa1
            </a>
          </p>
          <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
            <Link href={'https://github.com/dhdpekfa1'} className='sns_btn'>
              <svg
                fill='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M12 0.297C5.373 0.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.776.419-1.305.762-1.605-2.665-.305-5.466-1.333-5.466-5.931 0-1.31.468-2.382 1.235-3.222-.123-.303-.536-1.526.117-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 013.004-.404c1.018.005 2.042.137 3.004.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.65.242 2.873.12 3.176.77.84 1.232 1.912 1.232 3.222 0 4.61-2.807 5.623-5.478 5.92.43.37.824 1.102.824 2.222 0 1.606-.014 2.896-.014 3.286 0 .32.192.694.8.576C20.565 22.092 24 17.594 24 12.297 24 5.67 18.627 0.297 12 0.297z' />{' '}
              </svg>
            </Link>
            <Link
              href={'https://www.instagram.com/oh_yedam'}
              className='sns_btn'
            >
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
                <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' />
              </svg>
            </Link>
            <Link href={'www.linkedin.com/in/ollin0508'} className='sns_btn'>
              <svg
                fill='currentColor'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='0'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='none'
                  d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'
                />
                <circle cx='4' cy='4' r='2' stroke='none'></circle>
              </svg>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
