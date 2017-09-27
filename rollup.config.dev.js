const config = require('./rollup.config.base');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

config.plugins.push(serve({
  contentBase: ['static'],
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}));

config.plugins.push(livereload('static'));

module.exports = config;
