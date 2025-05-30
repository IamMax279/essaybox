const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/modal.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        heming: [
          'Heming Variable',
          'sans-serif'
        ],
        inter: [
          'Inter',
          'sans-serif'
        ],
        roboto: [
          'Roboto',
          'sans-serif'
        ],
        outfit: [
          'Outfit',
          'sans-serif'
        ]
      },
      colors: {
        bigbutton: '#1157a6'
      }
    },
  },
  plugins: [heroui()],
}

