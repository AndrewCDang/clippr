/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#162b34',
        'secondary' : 'rgb(70, 70, 70)',
        'light': 'rgb(173, 173, 173)',
        'red': '#FF5678'
      }
 
    },
  },
  plugins: [],
}
