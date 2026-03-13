import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"IM Fell English"', 'Georgia', 'Times New Roman', 'serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        sc: ['"IM Fell English SC"', 'Georgia', 'serif'],
      },
      colors: {
        graphite: {
          50:  '#f4f4f6',
          100: '#e8e8ec',
          200: '#c8c8d2',
          300: '#a8a8b8',
          400: '#78788a',
          500: '#58586a',
          600: '#42424f',
          700: '#323238',
          800: '#252528',
          900: '#1e1e22',
          950: '#16161a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
