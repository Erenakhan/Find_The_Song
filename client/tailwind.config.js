/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a9144",
        secondary: "#f1a9144"
      },
      
      boxShadow: {
        '3xl': '0 70px 120px -30px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

