/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        sidebar: '#0f2742',
        ink: '#172033'
      },
      boxShadow: {
        card: '0 10px 25px rgba(15, 39, 66, 0.08)'
      }
    }
  },
  plugins: []
}
