import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#FFFBF2",
        ivory: "#ffefcd",
        "ivory-60": "rgb(255, 239, 205, .6)",
        natural: "#a68e74",
        "natural-30": "rgb(166, 142, 116, .3)",
        brown: "#CAB69E",
        apricot: "#e09132",
        fern: "#424530",
        "fern-60": "rgb(66, 69, 48, .6)",
        "fern-30": "rgb(66, 69, 48, .3)",
        heart: "#F34C40",
        "heart-60": "rgb(243, 76, 64, .6)",
        "dark-30": "rgb(41, 41, 41, .3)",
        moss: "rgb(135, 160, 139)",
        "moss-60": "rgb(135, 160, 139, .6)",
        "default-gray": "#C4CDD5",
        matcha: "#95A041",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        italiana: ["var(--font-italiana)"],
        noto_sans: ["var(--font-noto-sans)"],
      },
      backgroundImage: {
        "home-mobile": "url('../public/images/home_mobile.png')",
        "home-desktop": "url('../public/images/home_desktop.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
