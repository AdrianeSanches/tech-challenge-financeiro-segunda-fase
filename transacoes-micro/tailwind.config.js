/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Garante que ele olha os arquivos certos do Angular
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1da1f2',
      },
    },
  },
  plugins: [],
}
