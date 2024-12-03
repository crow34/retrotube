/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'static': 'staticNoise 0.5s steps(10) infinite',
      },
      keyframes: {
        staticNoise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '20%': { transform: 'translate(10%, 5%)' },
          '30%': { transform: 'translate(-5%, 10%)' },
          '40%': { transform: 'translate(15%, -5%)' },
          '50%': { transform: 'translate(-15%, 15%)' },
          '60%': { transform: 'translate(15%, 5%)' },
          '70%': { transform: 'translate(-5%, 15%)' },
          '80%': { transform: 'translate(10%, -15%)' },
          '90%': { transform: 'translate(-15%, 5%)' },
        }
      }
    },
  },
  plugins: [],
};