import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from "rollup-plugin-terser";

import { name, version, author } from './package.json';

const banner =
  `/*!\n` +
  ` * ${name} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ${author}\n` +
  ` */`;

const plugins = [
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  eslint(),
  terser(),
  copy({
    targets: [{
      src: ['package.json', 'README.md'],
      dest: 'dist',
    }]
  }),
];

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}.js`,
    format: 'cjs',
    name,
    banner,
  },
  plugins,
};