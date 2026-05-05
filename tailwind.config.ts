import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './client/index.html',
    './client/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        cream: '#F8F6F1',
        'gray-soft': '#F0EDE8',
        text: '#1A1A2E',
        'text-muted': '#6B7280',
      },
    },
  },
  plugins: [],
};

export default config;
