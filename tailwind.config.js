/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: 'var(--font-roboto)',
        nameUser: 'var(--font-open)',
        postTitle: 'var(--font-playfair)',
        content: 'var(--font-noto)',
        button: 'var(--font-nunito)',

      }
    },
  },
  plugins: [],
}