module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
