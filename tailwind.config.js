module.exports = {
  purge: ["pages/**/*.{js,ts,jsx,tsx}", "components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      textColor: ["disabled"],
      backgroundColor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
