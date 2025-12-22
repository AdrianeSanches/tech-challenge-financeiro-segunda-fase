/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    // Inclui os arquivos do microfrontend Angular para que as classes sejam compiladas
    "../transacoes-micro/src/**/*.{html,ts}",
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

