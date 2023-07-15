const screens = {
  ms: "320px", // Mobile Small
  mm: "375px", // Mobile Medium
  ml: "425px", // Mobile Large
  sm: "768px", // Tablet
  md: "1024px", // Desktop
  lg: "1440px", // Large Desktop
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: screens,
    maxWidth: screens,
    extend: {},
  },
  plugins: [],
}
