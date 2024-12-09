"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../common/theme-toggle-button";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-second rounded-full"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>

          <span className="ml-3 text-xl">오예닮 포트폴리오</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            href={"/"}
            className={`nev_btn ${
              pathname === "/" ? "text-gray-800 dark:text-point font-bold" : ""
            }`}
          >
            홈
          </Link>
          <Link
            href={"/projects"}
            className={`nev_btn ${
              pathname === "/projects"
                ? "text-gray-800 dark:text-point font-bold"
                : ""
            }`}
          >
            프로젝트
          </Link>
          <Link
            href={"/about-me"}
            className={`nev_btn ${
              pathname === "/about-me"
                ? "text-gray-800 dark:text-point font-bold"
                : ""
            }`}
          >
            연락처
          </Link>
        </nav>

        <ThemeToggleButton />
      </div>
    </header>
  );
};

export { Header };
