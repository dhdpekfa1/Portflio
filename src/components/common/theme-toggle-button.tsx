"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onToggleClick = () => {
    setTheme(theme === "light" || resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <button
        className="inline-flex items-center bg-gray-200 dark:bg-slate-600 dark:text-slate-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-100 hover:dark:bg-slate-700 hover:text-orange-400 dark:hover:text-yellow-300 rounded text-base mt-4 md:mt-0"
        type="button"
        onClick={onToggleClick}
      >
        {/* {resolvedTheme === "light" ? ( */}
        {/* Light Mode */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="visible dark:invisible dark:w-0 dark:h-0 w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
        {/* ) : ( */}
        {/* Dark Mode */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="invisible dark:visible dark:w-5 dark:h-5 w-0 h-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
        {/* )} */}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
