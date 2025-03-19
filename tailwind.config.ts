import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
  content: [
    './app/layout.tsx',
    './src/components/designSystem/**/*.tsx',
    './src/components/layout/**/*.tsx',
    './src/utils/tailwind-colors-utils.tsx',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xl: '1224px',
        },
      },
    },
  },
  plugins: [
    require('tailwind-fontawesome')({
      family: 'solid',
      pro: false,
      version: 6,
    }),
  ],
});
export default config;
