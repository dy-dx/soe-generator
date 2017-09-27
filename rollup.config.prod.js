const config = require('./rollup.config.base');
const uglify = require('rollup-plugin-uglify');

config.plugins.push(uglify());

module.exports = config;
