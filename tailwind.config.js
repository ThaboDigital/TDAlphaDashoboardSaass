/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0A0E3F',
        'red': '#FF1A1A',
        'navy-light': '#1A1F5C',
        'navy-dark': '#060A2E',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
};
