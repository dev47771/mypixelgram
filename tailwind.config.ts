import { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

interface TailwindPluginContext {
   addUtilities: (
      utilities: Record<string, { filter?: string; transform?: string }>,
      variants?: string[]
   ) => void
}

const config: Config = {
   content: ['./src/app/**/*.{ts,tsx,js,jsx}', './src/components/**/*.{ts,tsx,js,jsx}'],
   theme: {
      extend: {
         colors: {
            accent: {
               100: 'var(--color-accent-100)',
               300: 'var(--color-accent-300)',
               500: 'var(--color-accent-500)',
               700: 'var(--color-accent-700)',
               900: 'var(--color-accent-900)',
            },
            success: {
               100: 'var(--color-success-100)',
               300: 'var(--color-success-300)',
               500: 'var(--color-success-500)',
               700: 'var(--color-success-700)',
               900: 'var(--color-success-900)',
            },
            danger: {
               100: 'var(--color-danger-100)',
               300: 'var(--color-danger-300)',
               500: 'var(--color-danger-500)',
               700: 'var(--color-danger-700)',
               900: 'var(--color-danger-900)',
            },
            warning: {
               100: 'var(--color-warning-100)',
               300: 'var(--color-warning-300)',
               500: 'var(--color-warning-500)',
               700: 'var(--color-warning-700)',
               900: 'var(--color-warning-900)',
            },
            dark: {
               100: 'var(--color-dark-100)',
               300: 'var(--color-dark-300)',
               500: 'var(--color-dark-500)',
               700: 'var(--color-dark-700)',
               900: 'var(--color-dark-900)',
            },
            light: {
               100: 'var(--color-light-100)',
               300: 'var(--color-light-300)',
               500: 'var(--color-light-500)',
               700: 'var(--color-light-700)',
               900: 'var(--color-light-900)',
            },
            misc: {
               primary: {
                  100: 'var(--color-primary-100)',
               },
               secondary: {
                  100: 'var(--color-secondary-100)',
                  200: 'var(--color-secondary-100)',
               },
               neutral: {
                  100: 'var(--color-neutral-100)',
               },
               error: {
                  100: 'var(--color-error-100)',
               },
            },
         },
         fontSize: {
            xs: 'var(--font-size-xs)',
            s: 'var(--font-size-s)',
            m: 'var(--font-size-m)',
            l: 'var(--font-size-l)',
            xl: 'var(--font-size-xl)',
            xxl: 'var(--font-size-xxl)',
         },
         lineHeight: {
            s: 'var(--line-height-s)',
            m: 'var(--line-height-m)',
            l: 'var(--line-height-l)',
         },
         fontWeight: {
            regular: 'var(--font-weight-regular)',
            medium: 'var(--font-weight-medium)',
            semiBold: 'var(--font-weight-semiBold)',
            bold: 'var(--font-weight-bold)',
         },
      },
      animation: {
         'pulse-scale': 'pulse-scale 1s ease-in-out infinite',
         spin: 'spin 1s linear infinite',
      },
      keyframes: {
         'pulse-scale': {
            '0%, 100%': {
               transform: 'scale(0)',
               opacity: '0.5',
            },
            '50%': {
               transform: 'scale(1)',
               opacity: '1',
            },
         },
         spin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
         },
      },
      container: {
         center: true,
         padding: '60px',
         screens: {
            xl: '1280px',
         },
      },
   },
   plugins: [
      forms,
      function ({ addUtilities }: TailwindPluginContext) {
         const newUtilities = {
            '.filter-none': {
               filter: 'none',
            },
            '.filter-grayscale': {
               filter: 'grayscale(100%)',
            },
            '.filter-clarendon': {
               filter: 'contrast(120%) saturate(125%)',
            },
            '.filter-moon': {
               filter: 'grayscale(100%) contrast(110%) brightness(110%)',
            },
            '.filter-lark': {
               filter: 'contrast(90%) saturate(150%)',
            },
            '.filter-retro': {
               filter: 'sepia(50%) contrast(75%) brightness(105%) saturate(120%)',
            },
            '.filter-warm': {
               filter: 'brightness(110%) saturate(150%) sepia(30%)',
            },
            '.filter-1970s': {
               filter: 'sepia(30%) hue-rotate(-10deg) contrast(115%) saturate(120%)',
            },
            '.filter-aden': {
               filter: 'hue-rotate(-20deg) contrast(90%) brightness(120%) saturate(85%)',
            },
         }
         addUtilities(newUtilities, ['responsive', 'hover'])
      },
   ],
}

export default config
