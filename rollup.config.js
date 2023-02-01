import ts from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { sync as glob } from "fast-glob";
import { rmSync, mkdirSync, writeFileSync, copyFileSync } from "fs";

import pkg from "./package.json";

const newPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  keywords: pkg.keywords,
  author: pkg.author,
  repository: pkg.repository,
  license: pkg.license,
  dependencies: pkg.dependencies,

  type: "module",
  types: "./esm/index.d.ts",
  module: "./esm/index.js",
  main: "./cjs/index.js",

  exports: {
    ".": {
      "types": "./esm/index.d.ts",
      "import": "./esm/index.js",
      "require": "./cjs/index.js",
    },
    "./*": {
      "types": "./esm/*.d.ts",
      "import": "./esm/*.js",
      "require": "./cjs/*.js",
    },
  },

  files: [
    "esm",
    "cjs",
    "*.js",
    "*.d.ts",
  ]
}

export default {
  input: glob(["src/index.ts", "src/*Patch.ts", "src/*Rom.ts"]),
  output: [
    {
      name: "rommage",
      dir: "dist/cjs/",
      format: "cjs",
    },
    {
      name: "rommage",
      dir: "dist/",
      format: "cjs",
    },
    {
      dir: "dist/esm/",
      format: "esm",
    },
  ],
  plugins: [ts(), commonjs(), nodeResolve({preferBuiltins: false})]
};

rmSync("./dist", {recursive: true, force: true});
mkdirSync("./dist");
writeFileSync("./dist/package.json", JSON.stringify(newPkg, null, 2));
copyFileSync("./README.md", "./dist/README.md");
