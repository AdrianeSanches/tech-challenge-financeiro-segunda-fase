import type { Config } from 'tailwindcss'

const config: Config = {
  // Onde o Tailwind deve procurar suas classes (aqui incluímos arquivos .tsx)
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Caso use Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Caso use Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exemplo de customização
        primary: '#1da1f2',
      },
      fontFamily: {
        // Exemplo de fontes customizadas
        sans: ['Graphik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config