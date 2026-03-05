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
          bg:       '#0c0d10',
          surface:  '#13151a',
          card:     '#1a1d24',
          border:   '#2a2d36',
          muted:    '#3a3d4a',
          text:     '#e2e4ea',
          subtext:  '#7a7f94',
          amber:    '#f59e0b',
          'amber-dim': '#92610a',
          cyan:     '#06b6d4',
          green:    '#22c55e',
          red:      '#ef4444',
          yellow:   '#eab308',
          orange:   '#f97316',
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
