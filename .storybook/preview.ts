import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'
import '@fontsource-variable/roboto'
import { themes } from '@storybook/theming'

const preview: Preview = {
   parameters: {
      docs: {
         theme: themes.dark,
      },
      backgrounds: {
         options: {
            light: { name: 'Light', value: '#fff' },
            dark: { name: 'Dark', value: '#0D0D0D' },
         },
      },
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },

      a11y: {
         // 'todo' - show a11y violations in the test UI only
         // 'error' - fail CI on a11y violations
         // 'off' - skip a11y checks entirely
         test: 'todo',
      },
   },
}

export default preview
