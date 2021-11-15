import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
// 显示（打印出）输出的文件size
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const plugins = [
  globals(),
  builtins(),
  localResolve(),
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  })
  //, terser(),
  , filesize()
];


export default [
  // 1. 生成umd、iife、cjs
  {
    input: `tmp/index.esm.js`,
    output: [{
        file: `tmp/index.js`,
        format: 'umd',
        name: 'index',
        // sourcemap: true
      },
      {
        file: `tmp/index.fe.js`,
        format: 'iife',
        name: 'index'
      },
      {
        file: `tmp/index.cjs.js`,
        format: 'cjs',
        name: 'index'
      },
    ],
    plugins,
  },
];
