/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js,jsx,tsx}",
    "./components/**/*.{html,js,jsx,tsx}",
    "./layouts/**/*.{html,js,jsx,tsx}",
    "./templates/**/*.{html,js,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px", // "100%",
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        source: ['"Source Sans Pro"', "sans-serif"],
      },
      backgroundColor: {
        // background colors
        "primary-light": "#fff",
        "primary-dark": "#0F0F0F",
      },
      colors: {
        // text colors
        "primary-light": "#000",
        "primary-dark": "#fff",
        "category-one": "#FBF3D5",
        "category-two": "#A1E536",
        "category-three": "#07976F",
        "category-four": "#0D9488",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
