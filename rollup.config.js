import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

import { sync } from "rimraf";

import pkg from "./package.json";

const config = ({ file, format, minified }) => {
  const minSuffix = minified ? ".min" : "";
  return {
    input: "src/index.ts",
    output: {
      file: `${file}${minSuffix}`,
      format,
      sourcemap: true,
    },
    plugins: [
      ts(),
      commonjs(),
      minified
        ? terser({
            compress: true,
            mangle: true,
          })
        : undefined,
    ].filter(Boolean),
    external: ["crc/crc32", "buffer", "lodash-es"],
  };
};

sync("dist");

export default [
  { file: pkg.main, format: "cjs", minified: false },
  { file: pkg.main, format: "cjs", minified: true },
  { file: pkg.module, format: "esm", minified: false },
  { file: pkg.module, format: "esm", minified: true },
].map(config);
