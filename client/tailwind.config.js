/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/theme';
export default {
  content: [
    "./index.html", // Ensure Vite's entry file is included
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all React files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()]
};
