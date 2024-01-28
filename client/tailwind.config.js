const { transform } = require('next/dist/build/swc');

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
        'primary' : 'rgba(var(--main-col-primary),<alpha-value>)',
        'secondary' : 'rgba(var(--main-col-secondary),<alpha-value>)',
        'light': 'rgba(var(--main-col-light),<alpha-value>)',
        'light-2': 'rgba(var(--main-col-light-2),<alpha-value>)',
        'light-3': 'rgba(var(--main-col-light-3),<alpha-value>)',
        'primary-f' : 'rgba(var(--main-col-primary-f),<alpha-value>)',
        'secondary-f' : 'rgba(var(--main-col-secondary-f),<alpha-value>)',
        'light-f': 'rgba(var(--main-col-light-f),<alpha-value>)',
        'light-2-f': 'rgba(var(--main-col-light-2-f),<alpha-value>)',
        'light-3-f': 'rgba(var(--main-col-light-3-f),<alpha-value>)',
        'red': 'rgba(var(--main-col-red),<alpha-value>)',
        'blue': 'rgba(var(--main-col-blue),<alpha-value>)',
        'yellow': 'rgba(var(--main-col-yellow),<alpha-value>)',
        'bg': 'rgba(var(--main-bg),<alpha-value>)',
        'bg-2': 'rgba(var(--main-bg-2),<alpha-value>)',
        'white': 'rgba(var(--main-col-white),<alpha-value>)',

      },
      boxShadow: {
        'surround': '0px_0px_12px_rgba(var(--main-col-primary),0.3)'
      },
      keyframes:{
        appearIn: {
          '0%':{transform:'translateY(16px)',opacity:'0'},
          '100%': { transform:'translateY(0px)', opacity:'1'}
        }
      },
      animation:{
        appearIn:'appearIn 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
}
