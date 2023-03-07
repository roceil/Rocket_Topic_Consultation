/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container:{
      center:true,
      padding: {
        DEFAULT: '24px',
        xl: '112px',
      },
      fontFamily: {
        'sans': ['Noto Sans', 'Noto Sans TC', 'sans-serif' ],
        'serif': ['sans-serif']
      }
    },
    screens: {
      'sm': '428px',
      // => @media (min-width: 428px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }

      'xl': '1440px',
      // => @media (min-width: 1420px) { ... }
    },

    extend: {
      fontSize:{
        "4xl-plus":"40px"
      }
    }
  },
  plugins: []
}
