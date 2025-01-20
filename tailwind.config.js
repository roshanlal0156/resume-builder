/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      screens:{
        '500':'500px',
        '400':'400px'
      }
    },
  },
  plugins: [],
}