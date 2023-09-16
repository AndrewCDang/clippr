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
        'third' : 'rgb(100, 100, 100)',
        'light': 'rgb(173, 173, 173)',
        'light-2': 'rgb(211, 211, 211)',
        'light-3': 'rgb(240, 240, 240)',
        'red': '#FF5678',
        'blue': 'hsl(183, 95%, 43%)',
        'yellow': '#FFD056'
      }
 
    },
  },
  plugins: [],
}
