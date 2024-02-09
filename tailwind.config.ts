import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#9333EA',
              foreground: '#ffffff',
            },
            focus: '#9333EA',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#29333EA',
              foreground: '#ffffff',
            },
            focus: '#9333EA',
          },
        },
      },
    }),
  ],
  darkMode: 'class',
}
export default config
