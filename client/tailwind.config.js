const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(dropdown|input|modal|menu|divider|popover|button|ripple|spinner|form).js"
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
        bigbutton: '#1157a6',
        dropdown: '#207ADF'
      },
      screens: {
        smll: '500px',
        mxl: '1408px',
        sdbr: '790px',
        xsmll: '463px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    heroui()
  ],
}

