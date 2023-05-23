/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(249 115 22)",
        secondary: "rgb(37 99 235)",
      }
    },
  },
  plugins: [],
}