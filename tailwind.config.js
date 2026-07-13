/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/Resume/**/*.{js,ts,jsx,tsx}",
    "./src/components/Resume/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
      },
      fontFamily: {
        sans: ['Almarai', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
