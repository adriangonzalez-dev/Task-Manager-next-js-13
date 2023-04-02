/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'tasks': "url('/bg-4.png')",
      },
      colors: {
        danger:{
          
          100:'#FAE5E9',
          200:'#F5CCD3',
          300:'#F0B3BD',
          400:'#EB99A6',
          500:'#E37285',
          600:'#D42A46',
          700:'#B0233A'
        },
        success:{
          100:'#D6FAE4',
          200:'#ACF5C9',
          700:'#0E7537'
        },
        warning:{
          100:'#FBF2DE',
          700:'#A37313'
        }
      }
    },
  },
  plugins: [],
}