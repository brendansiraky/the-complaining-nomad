import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        surface: '#1a1a1a',
        surface2: '#222',
        text: '#e8e4df',
        'text-muted': '#9a9590',
        accent: '#e51a1a',
        'accent-glow': '#ff2d2d',
        yellow: '#f5c842',
        border: '#2a2725',
        green: '#4ecb71',
        blue: '#4a9eff',
        purple: '#b47aff',
      },
      fontFamily: {
        archivo: ['"Archivo Black"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
