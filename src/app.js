// #UNCOMMENTED_IN_PROD# import 'airbnb-js-shims/target/es2015';
// #UNCOMMENTED_IN_PROD# import 'airbnb-browser-shims/browser-only';

import initGame from './lib/game';
import GeneratorDemo from './generator-demo';

const container = document.getElementById('container');

const generatorDemo = new GeneratorDemo();
container.appendChild(generatorDemo.containerElem);
generatorDemo.generate();

const canvas = document.createElement('canvas');
canvas.id = 'game';
canvas.height = 999;
canvas.width = 999;
container.appendChild(canvas);
initGame(canvas);
