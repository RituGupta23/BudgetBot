import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            primary: {
              50: "#eff6ff",
              100: "#dbeafe",
              500: "#3b82f6",
              600: "#2563eb",
              700: "#1d4ed8",
            },
          },
          fontFamily: {
            sans: ["Inter", "sans-serif"],
            serif: ["Merriweather", "serif"],
          },
        },
      },
    }),
  ],
});
