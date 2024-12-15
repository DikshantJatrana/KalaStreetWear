/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#00E0FF",
        primaryPink: "#FF48B0",
        primaryYellow: "#FFD500",
        primaryGrayDark: "#3A3A3A",
        primaryGrayLight: "#A5A5A5",
        primaryWhite: "#F5F5F5",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(255,213,0,1) 5%, rgba(255,72,176,1) 50%, rgba(0,224,255,1) 95%)",
      },
      fontFamily: {
        tanker: ["Tanker", "sans-serif"],
      },
    },
  },
  plugins: [],
};
