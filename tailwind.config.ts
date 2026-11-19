import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14231f",
        forest: "#153d35",
        mint: "#d8f2e5",
        cream: "#f7f8f4",
      },
      boxShadow: {
        card: "0 24px 80px rgba(25, 54, 45, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
