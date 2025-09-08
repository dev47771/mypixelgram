module.exports = {
   trailingComma: 'es5',
   tabWidth: 3,
   semi: false,
   singleQuote: true,
   endOfLine: 'auto',
   printWidth: 100,
   requirePragma: true,
   arrowParens: 'avoid',
   plugins: ['prettier-plugin-tailwindcss'],
   overrides: [
      {
         files: '{**/*,*}.{css,scss,sass,less,js,jsx,ts,tsx,json,md,mdx}',
         excludeFiles: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/coverage/**',
            '**/public/**',
            '**/*.d.ts',
            '**/deployment/**',
         ],
         options: {
            requirePragma: false,
         },
      },
   ],
}
