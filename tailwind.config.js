/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'white-transparent-15': 'rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
}

