module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buletinBlue: "#3F72AF",
        buletinDarkBlue: "#112D4E",
        buletinDarkerBlue: "#334257",
        buletinLightGray: "#DBE2EF",
      },
    },
  },
  plugins: [require("daisyui")],
}