/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        yt: {
          red: '#FF0000',
          dark: '#0f0f0f',
          card: '#1a1a1a',
          border: '#2a2a2a'
        }
      }
    },
  },
  plugins: [],
}
