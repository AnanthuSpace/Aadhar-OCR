/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ensure Vite's entry file is included
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all React files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
