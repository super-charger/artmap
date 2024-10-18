/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import coveredTheme from './src/configs/theme'

const config: Config = {
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
        ...coveredTheme.colors,
      },
      screens: {
        ...coveredTheme.screens,
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
  ],
}

export default config
