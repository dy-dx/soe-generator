// #UNCOMMENTED_IN_PROD# import 'airbnb-js-shims/target/es2015';
// #UNCOMMENTED_IN_PROD# import 'airbnb-browser-shims/browser-only';

import Soe from './lib/soe';

function generate(type) {
  const listElem = document.getElementById('equation-list');
  const pair = Soe.generateType(type);
  const { x, y } = Soe.solve(pair);
  listElem.innerText += `${pair[0].format()}\n${pair[1].format()}\n`;
  listElem.innerText += `x = ${x}\ny = ${y}\n\n`;
}

function createButton(type) {
  const container = document.getElementById('container');
  const button = document.createElement('input');
  container.appendChild(button);
  button.type = 'button';
  button.id = `generate-${type}-button`;
  button.value = `generate ${type}`;
  button.onclick = () => { generate(type); };
  return button;
}

createButton('elimination');
createButton('substitution');
createButton('random');

const list = document.createElement('pre');
list.id = 'equation-list';
document.getElementById('container').appendChild(list);

generate('random');
