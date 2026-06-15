/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006948",
        "primary-container": "#00855d",
        secondary: "#2b6954",
        "secondary-container": "#adedd3",
        surface: "#f7f9fb",
        "on-surface": "#191c1e",
        "on-surface-variant": "#3d4a42",
        outline: "#6d7a72",
        "outline-variant": "#bccac0",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}