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
        content: 'var(--font-noto)',
        button: 'var(--font-nunito)',

      },
      colors: {
        backgroundColor: '#FFFFFF',
        socialFont: '#0047AB',
        userFont: '#000000',
        postContentFont: '#333333',
        buttonColorFont: '#F5F5F5',
        userBackground: '#F5F5F5',
        buttonBackground: '#005CBF',
        postBackground: '#F5F5F5',
        commentBackground: '#F5F5F5',
      },
    },
  },
  plugins: [],
}