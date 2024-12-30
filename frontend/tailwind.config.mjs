/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind")

export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "offblack": "#151515",
      },
      backgroundImage: {
        
      },
    },
  },
 plugins: [
   function({ addUtilities }) {
     const newUtilities = {
       '.text-stroke-black': {
         '-webkit-text-stroke': '1.1px black',
        },
        '.text-stroke-white': {
          '-webkit-text-stroke': '1.1px white',
        },
      }
      
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
    flowbite.plugin(),
  ],
}

