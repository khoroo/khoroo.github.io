/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        background: '#eaeaea',
        text: '#212121',
        accent: '#cccccc',
        'dark-bg': '#151515',
        'dark-text': '#eaeaea',
      },
      fontFamily: {
        sans: ['"Nimbus Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      height: {
        'header': '5rem',
      },
      width: {
        'canvas': '180px',
      },
      maxWidth: {
        'content': '800px',
      },
    },
  },
  plugins: [],
};
