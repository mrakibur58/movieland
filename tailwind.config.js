const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      boxShadow: {
        bottom: "0 4px 6px -4px rgba(0, 0, 0, 0.25)", // Only at the bottom
      },
    },
    screens: {
      sm: "640px", // Small screens
      md: "880px", // Medium screens
      lg: "1024px", // Large screens
      xl: "1280px", // Extra-large screens
      "2xl": "1536px", // Double extra-large screens
    },
  },
  plugins: [flowbite.plugin()],
};
