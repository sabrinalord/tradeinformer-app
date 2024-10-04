import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        navy: "var(--navy)",
        babyblue: "var(--babyblue)",
        warmYellow:"var(--warmYellow)"
      },
    },
  },
  plugins: [],
};
export default config;
