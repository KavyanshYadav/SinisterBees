/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        notion: {
          light: {
            primary: '#FFFFFF',
            secondary: '#F7F6F3',
            accent: '#E9E7E3',
            textPrimary: '#2D3436',
            textSecondary: '#878787',
          },
          dark: {
            primary: '#181818',
            secondary: '#242424',
            accent: '#3A3A3A',
            textPrimary: '#D4D4D4',
            textSecondary: '#7B7B7B',
            hover:"#2c2c2c"

          },
        },
      },
    },
  },
  plugins: [],
};
