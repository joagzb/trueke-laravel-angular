/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}", // Add this line
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Montserrat', 'Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        light: {
          'teal': '#008080',
          'coral': '#FF6F61',
          'soft-grey': '#F5F5F5',
          'dark-slate-grey': '#2F4F4F',
          'golden-yellow': '#FFD700',
        },
        dark: {
          'charcoal': '#333333',
          'teal': '#008080',
          'coral': '#FF6F61',
          'light-grey': '#E0E0E0',
          'golden-yellow': '#FFD700',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
};
