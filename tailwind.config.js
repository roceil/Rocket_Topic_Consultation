/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        lg: '112px',
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans TC', 'sans-serif'],
        serif: ['sans-serif'],
      },
    },
    screens: {
      sm: '428px',
      // => @media (min-width: 428px) { ... }

      md: '597px',
      // => @media (min-width: 628px) { ... }

      lg: '1280px',
      // => @media (min-width: 1280px) { ... }

      xl: '1440px',
      // => @media (min-width: 1420px) { ... }
    },

    extend: {
      fontSize: {
        '4xl-plus': '40px',
      },
      colors: {
        primary: {
          DEFAULT: '#FFF6E2',
          tint: '#FFFCF6',
          heavy: '#FFEFCD',
          border: '#F4E6C0',
        },
        secondary: '#4A5364',
        gray: {
          900: '#424242',
          800: '#616161',
          700: '#757575',
          600: '#9E9E9E',
          500: '#BDBDBD',
          400: '#E0E0E0',
          300: '#ECECEC',
          200: '#F5F5F5',
          100: '#FFFFFF',
        },
        error: '#BC493A',
        success: '#79DDA9',
        bg1: '#F2F1FA',
        bg2: '#EEECFA',
      },
      animation: {
        wiggle: 'wiggle 5s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(10px)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(10px)' },
        },
        chatRoomOpen: {
          '0%': { transform: 'translateX(-10000px)' },
          '100%': { transform: 'translateX(100px)' },
        },
        chatRoomClose: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      backgroundImage: {
        bannerBG: "url('/images/home/banner/BannerBG.svg')",
        bannerBGSM: "url('/images/home/banner/BannerBGSM.svg')",
        loginBG: "url('/images/login/login-img.svg')",
      },
    },
  },
  plugins: [],
};
