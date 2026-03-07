import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7FA9",
        secondary: "#6C8CFF",
        accent: "#FFD166",
        background: "#F7F9FC",
        surface: "#FFFFFF",
        ink: "#24314D",
        muted: "#7A8AAA",
        success: "#34C759",
        warning: "#FFB547",
        danger: "#FF5C7C"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(108, 140, 255, 0.14)",
        card: "0 14px 32px rgba(36, 49, 77, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(255,127,169,0.30), transparent 36%), radial-gradient(circle at top right, rgba(108,140,255,0.28), transparent 34%), linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)"
      }
    }
  },
  plugins: []
};

export default config;
