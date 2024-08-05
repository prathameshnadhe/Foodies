/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0 4px 8px 0 rgba(78, 78, 78, 0.19), 0 6px 20px 0 rgba(78, 78, 78, 0.19)",
        customHover:
          "0 20px 24px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
      },
    },
    screens: {
      mobile: "680px",
      tablet: "1025px",
      // => @media (min-width: 640px) { ... }

      laptop: "1474px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1880px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
