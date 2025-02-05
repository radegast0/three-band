/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  darkMode: "class",
  plugins: [heroui()],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
};
