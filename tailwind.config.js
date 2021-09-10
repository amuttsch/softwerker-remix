module.exports = {
  purge: ["./app/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        softwerker: {
          DEFAULT: " #54FEF9",
          dark: "#54AEFE",
          light: "#76fefa",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
