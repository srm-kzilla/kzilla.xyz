import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import UnoCSS from "unocss/vite";
import UnoConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [solidPlugin(), UnoCSS(UnoConfig)],
});
