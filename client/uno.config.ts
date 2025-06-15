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
  },
  presets: [presetWind3(), presetAttributify()],
});
