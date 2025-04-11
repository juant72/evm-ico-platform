/** @type {import('tailwindcss').Config} */
module.exports = {
  // In Tailwind v4, `content` has been renamed to `files`
  files: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        // Esto reintroduce los valores de espaciado que necesitas
        '5': '1.25rem',
        // Puedes añadir más valores si los necesitas
      }      
    },
  },
  plugins: [],
};
