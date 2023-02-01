import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import { sync as glob } from "fast-glob";

import { sync as remove } from "rimraf";

const config = ({ format, ext }) => {
  return {
    input: glob(["src/index.ts", "src/*Patch.ts", "src/*Rom.ts"]),
    output: {
      name: "rommage",
      dir: `dist/${format}/`,
      format,
      sourcemap: true,
    },
    plugins: [ts(), commonjs()],
    external: ["crc/crc32", "buffer", "lodash-es"],
  };
};

remove("dist");

export default [
  { format: "cjs", ext: ".cjs" },
  { format: "esm", ext: ".mjs" },
].map(config);
