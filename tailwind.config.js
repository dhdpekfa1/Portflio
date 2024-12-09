/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#84c27d",
        secondary: "#6ea368",
        ef: "#fefefe",
        dd: "#ddd",
        two: "#222",
        three: "#333",
      },
    },
  },
  plugins: [],
};
