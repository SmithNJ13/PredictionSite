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
        "AshGray": "#bac1b8",
        "RaisinBlack": "#161925",
        "GunMetal": "#2b303a",
        "Moonstone": "#40BAD5 ",
        "DarkSpring": "#0c7c59",
        "SpringGreen": "#0fff95",
        "Aquamarine": "#4BFFB1",
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

