/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#39DB4A",
        // green: "#cd2f12",
        red: "#FF6868",
        secondary: "#555",
        primaryBG: "#FCFCFC",
      },
    },
  },
  plugins: [require("daisyui")],
};

// #39DB4A
