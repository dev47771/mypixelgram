// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
   baseDirectory: __dirname,
})

const eslintConfig = [
   js.configs.recommended,
   ...compat.extends('next/core-web-vitals', 'next/typescript'),
   {
      ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'dist/**', 'next-env.d.ts'],
   },
   {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
         react: reactPlugin,
         'react-hooks': reactHooksPlugin,
         '@typescript-eslint': tsPlugin,
      },
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
         },
      },
      rules: {
         ...reactPlugin.configs.recommended.rules,
         ...reactHooksPlugin.configs.recommended.rules,
         ...tsPlugin.configs.recommended.rules,
         'react/react-in-jsx-scope': 'off',
         'react/prop-types': 'off',
         'react-hooks/rules-of-hooks': 'error',
         'react-hooks/exhaustive-deps': 'warn',
         'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
   },
   {
      files: ['**/*.stories.{js,jsx,ts,tsx}'],
      plugins: {
         storybook,
      },
      rules: {
         ...storybook.configs['flat/recommended'][0].rules,
      },
   },
]

export default eslintConfig
