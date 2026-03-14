import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      colors: {
        warm: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
        },
      },
    },
  },
  plugins: [],
};

export default config;
