const config = require('./rollup.config.base');
const uglify = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');

config.plugins.unshift(replace({
  include: 'src/app.js',
  delimiters: ['', ''],
  '// #UNCOMMENTED_IN_PROD# ': '',
}));

config.plugins.push(uglify());

module.exports = config;
