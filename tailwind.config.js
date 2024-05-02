/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#393943",
        primary: "#222233",
        secondary: "#F3B552",
        // tertiary: "#387FC8",
        // tertiary: "#B2D1E6",
        tertiary: "#AACCFF",
      },
    },
    screens: {
      sm: { max: "639px" },
      // md: {'max': '767px'},
      lg: { max: "2023px" },
    },
  },
  plugins: [],
};
