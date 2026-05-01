/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['Fredoka', 'system-ui', 'sans-serif'],
      },
      colors: {
        meadow: {
          50: '#f0fbe8',
          100: '#dff5cc',
          200: '#bfe89a',
          300: '#9bd967',
          400: '#7cc83f',
          500: '#5fb023',
          600: '#488a18',
          700: '#386916',
          800: '#2c5215',
          900: '#243f13',
        },
        sun: {
          100: '#fff5cc',
          200: '#ffe98a',
          300: '#ffd84d',
          400: '#ffc11f',
          500: '#f5a300',
        },
        berry: {
          300: '#ff8fb1',
          400: '#ff5a8b',
          500: '#e63268',
        },
        sky_: {
          200: '#bde6ff',
          300: '#7fcfff',
          400: '#3eb3ff',
        },
        magic: {
          400: '#b977ff',
          500: '#9b4dff',
          600: '#7b2eff',
        },
      },
      boxShadow: {
        soft: '0 8px 24px -8px rgba(0,0,0,0.18)',
        glow: '0 0 24px rgba(255, 215, 100, 0.55)',
      },
      borderRadius: {
        chunky: '1.5rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'sparkle': 'sparkle 800ms ease-out forwards',
        'wiggle': 'wiggle 600ms ease-in-out',
      },
      keyframes: {
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0)', opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1.6) rotate(180deg)', opacity: '0' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(6deg)' },
        },
      },
    },
  },
  plugins: [],
}
