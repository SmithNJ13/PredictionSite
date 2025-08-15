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
        primaryAccent: "#4CAF50",       // Main accent, buttons, highlights
        primaryText: "#E0E0E0",         // Main body text
        secondaryText: "#B4B4B4",       // Subheadings, muted descriptions
        mainBackground: "#121212",      // Main background
        mainForeground: "#1E1E1E",      // Foreground (Live games, profile, components)
        dividers: "#2C2C2C",            // Dividers for UI
        borders: "#3A3A3A",             // Subtle borders
        error: "#E53935",               // Error messages / delete buttons
        success: "#43A047",             // Success messages / submit buttons?
        inactive: "#757575",            // Inactive states
        linkDefault: "#64B5F6",         // Links...
        linkHover: "#42A5F5",
        linkActive: "#1E88E5",
        subtleGlow: "#2E7D32",          // Glows and highlights
        shadowOverlay: "rgba(0,0,0,0.6)"// Shadows for overlays and components
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.4)',
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

