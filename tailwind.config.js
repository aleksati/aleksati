/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{html,js,jsx,tsx}",
    "./src/components/**/*.{html,js,jsx,tsx}",
    "./src/layouts/**/*.{html,js,jsx,tsx}",
    "./src/templates/**/*.{html,js,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontWeight: {
      bold: "600",
    },
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        // lg: "1024px",
        // xl: "768px",
        // md: "768px",
        // lg: "1024px",
        // xl: "1280px",
        // md: "768px",
        // lg: "768px",
        // xl: "768px",
      },
    },
    // original:
    fontSize: {
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    // one up larger
    // change also, dateViewerKeyword and LayoutPage
    // fontSize: {
    //   // xs: "0.7rem",
    //   xs: "0.8rem",
    //   sm: "1rem",
    //   base: "1.125rem",
    //   lg: "1.25rem",
    //   xl: "1.563rem",
    //   "2xl": "1.953rem",
    //   "3xl": "2.441rem",
    //   "4xl": "3.052rem",
    //   "5xl": "3.052rem",
    // },
    extend: {
      maxHeight: {
        128: "32rem",
      },
      // fontFamily: {
      //   source: ['"Ubuntu"', "sans-serif"],
      // },
      backgroundColor: {
        // background colors
        "primary-light": "#fff",
        "primary-dark": "#161618", //"#333333", //"#0F0F0F", //"#1E1E1E", //#202124 #333333
      },
      colors: {
        // text colors
        // secondary: "#94a3b8",
        "primary-light": "#000",
        "primary-dark": "#fff",
        secondary: "#8b949e",
        "secondary-dark": "#6b7280",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};