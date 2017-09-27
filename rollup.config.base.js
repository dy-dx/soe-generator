const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

module.exports = {
  input: 'src/app.js',
  output: {
    file: 'static/bundle.js',
    format: 'iife',
  },
  moduleContext: {
    [require.resolve('whatwg-fetch')]: 'window',
  },
  sourcemap: true,
  plugins: [
    replace({
      include: 'node_modules/kontra/kontra.js',
      delimiters: ['', ''],
      'this.kontra =': 'var kontra; export default kontra =',
    }),
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

