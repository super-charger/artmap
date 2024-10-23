/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import coveredTheme from './src/configs/theme'

const config: Config = {
  darkMode: ['class'],
  content: [
    // TODO: 수정필요
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/configs/**/*.{js,ts,jsx,tsx,mdx}',
    './src/generated/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        ...coveredTheme.colors,
      },
      screens: {
        ...coveredTheme.screens,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, theme }) {
      addBase({
        '*, *::before, *::after': {
          'box-sizing': 'border-box',
        },
        body: {
          'font-family': theme('fontFamily.sans'),
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          color: theme('colors.grayscale_black'),
        },
        'img, picture, video, canvas, svg': {
          display: 'block',
          'max-width': '100%',
        },
        'input, button, textarea, select': {
          font: 'inherit',
        },
        '#root, #__next': {
          isolation: 'isolate',
        },
      })
      addComponents(coveredTheme.textStyles)
    }),
    require('tailwindcss-animate'),
  ],
}

export default config
