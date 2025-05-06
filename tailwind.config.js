/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boaz-blue': '#2563eb', // Couleur du bouton "Suivant"
        'boaz-primary': '#1e40af', // Couleur principale du logo Boaz
        'boaz-secondary': '#f59e0b', // Couleur secondaire du logo Boaz
        'boaz-gray': '#f3f4f6', // Couleur de fond gris clair
        'boaz-light-gray': '#e5e7eb', // Couleur de fond des éléments inactifs
      },
    },
  },
  plugins: [],
}
