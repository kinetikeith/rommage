import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";

import { sync } from "rimraf";

const config = ({ format, ext }) => {
  return {
    input: "src/index.ts",
    output: {
      name: "rommage",
      file: `dist/${format}/index${ext}`,
      format,
      sourcemap: true,
    },
    plugins: [ts(), commonjs()],
    external: ["crc/crc32", "buffer", "lodash-es"],
  };
};

sync("dist");

export default [
  { format: "cjs", ext: ".cjs" },
  { format: "esm", ext: ".mjs" },
].map(config);
