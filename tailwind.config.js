/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./layout/**/*.ejs", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        blueprint: {
          DEFAULT: "#0B3D91",
          50: "#EAF0FB",
          100: "#C7D7F1",
          200: "#9BB8E5",
          300: "#6E98D8",
          400: "#4679CB",
          500: "#0B3D91",
          600: "#0A3782",
          700: "#082C68",
          800: "#06214F",
          900: "#041735",
        },
        navy: {
          DEFAULT: "#0A2540",
          50: "#EAEFF4",
          100: "#C6D3E0",
          200: "#9FB4CB",
          300: "#7695B6",
          400: "#4E77A1",
          500: "#0A2540",
          600: "#092039",
          700: "#071A2E",
          800: "#051423",
          900: "#030D17",
        },
        ink: "#061224",
        cyan: {
          DEFAULT: "#5EDFFF",
          dim: "#2FA9CC",
          bright: "#A6EEFF",
        },
        steel: {
          DEFAULT: "#BFC7D5",
          dim: "#8A94A6",
          bright: "#DDE2EA",
        },
        success: "#7ED957",
        warning: "#F5C542",
        error: "#FF5F5F",
        paper: "#F4F1EA",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(94,223,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(94,223,255,0.08) 1px, transparent 1px)",
        "blueprint-grid-major":
          "linear-gradient(rgba(94,223,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(94,223,255,0.14) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
        "grid-major": "120px 120px",
      },
      boxShadow: {
        blueprint: "0 0 0 1px rgba(94,223,255,0.15)",
        "blueprint-hover": "0 0 0 1px rgba(94,223,255,0.4), 0 0 24px -8px rgba(94,223,255,0.35)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        scanline: "scanline 4s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
