require('babel-register')({
  babelrc: false,
  ignore: /node_modules/,
  presets: [
    ['airbnb', {
      modules: true,
      targets: { node: 'current' },
    }],
  ],
});
