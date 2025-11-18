/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#04152B",
          blue: "#0F1F3D",
          slate: "#1F2933",
          smoke: "#F5F7FA",
          accent: "#FFB703",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        heading: ["Archivo", "Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        glow: "0 35px 120px rgba(245, 189, 2, 0.25)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
