import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        backgroundColor: "#FFFDE4",
        primaryColor: "#054B0D",
        editorBg: "#A5A509",
        deleteBg: "#A50909",
        moneyExcess: "#FCF49A",
      },
    },
  },
  plugins: [],
} satisfies Config;
