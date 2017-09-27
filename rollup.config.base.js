const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'src/app.js',
  output: {
    file: 'static/bundle.js',
    format: 'iife',
  },
  sourcemap: true,
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  watch: {
    include: 'src/**',
  },
};

