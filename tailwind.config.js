/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': '1400px',
        '3xl': '1600px',
      },
      maxWidth: {
        '8xl': '1400px',
        '9xl': '1600px',
      }
    },
  },
  plugins: [],
};