import { defineConfig, presetAttributify } from "unocss";
import presetWind3 from "@unocss/preset-wind3";

export default defineConfig({
  theme: {
    fontFamily: {
      UniSansBook: "UniSansBook",
      UniSansHeavy: "UniSansHeavy",
      VisbyRoundLight: "VisbyRoundLight",
      VisbyRoundRegular: "VisbyRoundRegular",
    },
    colors: {
      green: "#54a870",
      orange: "#f0634d",
      blue: "#26baff",
      grey: "#f5f5f5",
      deepBlue: "#484c6e",
    },
    animation: {
      roll: "roll 10s ease-in-out infinite",
    },
    keyframes: {
      roll: {
        "0%": { transform: "translateY(-5em)" },
        "4%": { transform: "translateY(-3.65em)" },
        "25%": { transform: "translateY(-3.65em)" },
        "29%": { transform: "translateY(-2.41em)" },
        "50%": { transform: "translateY(-2.41em)" },
        "54%": { transform: "translateY(-1.25em)" },
        "75%": { transform: "translateY(-1.25em)" },
        "79%": { transform: "translateY(-0.04em)" },
        "100%": { transform: "translateY(-0.04em)" },
      },
    },
  },
  presets: [presetWind3(), presetAttributify()],
});
