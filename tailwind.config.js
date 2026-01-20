/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a192f', // Deep background
          800: '#112240', // Slightly lighter sections
          700: '#233554', // Borders/Accents
        },
        gold: {
          400: '#64ffda', // Using a cyan-gold/teal variant like the inspiration or sticking to true gold? 
                          // Inspiration uses a teal/cyan (64ffda). The user said "formal portfolio" for a man.
                          // The inspiration link actually uses a teal/cyan accent. 
                          // However, user prompt said "inspire", but also "formal".
                          // Let's stick to a classy Gold as proposed in the plan, it's safer for "formal".
          500: '#d4af37', // True Gold
          300: '#f1d06e',
        },
        slate: {
            light: '#ccd6f6',
            lighter: '#8892b0',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
