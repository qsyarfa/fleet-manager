/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fleet: {
          bg:       '#f1f4f9',
          surface:  '#ffffff',
          card:     '#ffffff',
          border:   '#e2e6ef',
          muted:    '#c9cdd8',
          text:     '#111827',
          subtext:  '#6b7280',
          amber:    '#d97706',
          'amber-dim': '#fef3c7',
          cyan:     '#0891b2',
          green:    '#16a34a',
          red:      '#dc2626',
          yellow:   '#ca8a04',
          orange:   '#ea580c',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        },
      },
    },
  },
  plugins: [],
}
