/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A1B4D',
          light: '#9B3A75',
          dark: '#3D0E2B',
        },
        accent: {
          DEFAULT: '#D4A574',
          light: '#E8C9A0',
        },
        bg: {
          DEFAULT: '#1A0A14',
          card: '#2D1525',
        },
        surface: {
          DEFAULT: '#331A2A',
          light: '#3D2234',
        },
      },
      fontFamily: {
        gmarket: ['GmarketSans', 'Pretendard Variable', 'sans-serif'],
        pretendard: ['Pretendard Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
