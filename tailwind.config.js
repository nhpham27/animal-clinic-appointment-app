/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tstsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
