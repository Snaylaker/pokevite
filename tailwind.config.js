/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
        },
      },
      backgroundImage: {
        sprinkle: "url('src/assets/Sprinkle.svg')",
      },
    },
  },
  plugins: [],
};
