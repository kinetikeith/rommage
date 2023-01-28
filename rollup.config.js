import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

import { sync } from "rimraf";

const config = ({ file, format, minified, ext }) => {
  const minSuffix = minified ? ".min" : "";
  return {
    input: "src/index.ts",
    output: {
      file: `dist/${format}/index${minSuffix}${ext}`,
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
  { format: "cjs", ext: ".js", minified: false },
  { format: "cjs", ext: ".js", minified: true },
  { format: "esm", ext: ".mjs", minified: false },
  { format: "esm", ext: ".mjs", minified: true },
].map(config);
