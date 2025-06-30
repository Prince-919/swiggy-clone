/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5200",
        secondary: "#676A6D",
        light: "#F2F2F3",
        green: "#1BA672",
      },
    },
  },
  plugins: [],
};
