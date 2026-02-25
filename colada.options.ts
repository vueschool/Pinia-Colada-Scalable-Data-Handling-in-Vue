// colada.options.ts
import type { PiniaColadaOptions } from "@pinia/colada";
import { PiniaColadaDelay } from "@pinia/colada-plugin-delay";

export default {
  plugins: [
    PiniaColadaDelay({
      delay: 200,
    }),
  ],
} satisfies PiniaColadaOptions;
