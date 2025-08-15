/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind")

export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        subheading: ["Poppins", "sans-serif"],
        mainText: ["Roboto", "sans-serif"],
        mainInfo: ["Inter", "sans-serif"],
        subText: ["Roboto Mono", "monospace"],
      },
      colors: {
        primaryAccent: "#4CAF50",       // main green
        primaryText: "#E0E0E0",         // main body text
        secondaryText: "#B4B4B4",       // subheadings / muted text
        mainBackground: "#121212",      // dark page background
        mainForeground: "#1E1E1E",      // cards / panels
        dividers: "#2C2C2C",            // subtle section dividers
        borders: "#3A3A3A",             // additional borders
        error: "#E53935",
        success: "#43A047",
        inactive: "#757575",
        linkDefault: "#64B5F6",
        linkHover: "#42A5F5",
        linkActive: "#1E88E5",
        subtleGlow: "#2E7D32",          // for soft glows / highlights
        shadowOverlay: "rgba(0,0,0,0.6)"// semi-transparent overlays
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.4)', // soft, professional shadow
        heading: '0 2px 6px rgba(0,0,0,0.6)'
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      }
    }
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

