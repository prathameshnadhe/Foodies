/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", // Adjust this path as needed
    "./public/index.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0 4px 8px 0 rgba(78, 78, 78, 0.19), 0 6px 20px 0 rgba(78, 78, 78, 0.19)",
        customHover:
          "0 20px 24px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundColor: "#ffffff" },
          "100%": { backgroundColor: "#f1f1f1" },
        },
      },
      animation: {
        shimmer: "shimmer 1s infinite alternate",
      },
    },
    screens: {
      mobile: "680px",
      // => @media (min-width: 680px) { ... }

      tablet: "1134px",
      // => @media (min-width: 1030px) { ... }

      laptop: "tailwind.config.jspx",
      // => @media (min-width: 1474px) { ... }

      desktop: "1880px",
      // => @media (min-width: 1880px) { ... }

      lg_desktop: "2100px",
      // => @media (min-width: 1880px) { ... }
    },
  },
  plugins: [],
};
