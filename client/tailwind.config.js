/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
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
  plugins: [],
}

