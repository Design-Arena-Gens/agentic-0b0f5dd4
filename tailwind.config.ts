import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F1E3C9",
        mint: "#4CBDBF",
        saffron: "#F4A259",
        deepBlue: "#1D3557"
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      },
      boxShadow: {
        dance: "0 20px 45px rgba(76, 189, 191, 0.25)"
      },
      backgroundImage: {
        "grain-overlay":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
