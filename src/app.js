// import 'airbnb-browser-shims';
import Soe from './lib/soe';

function generate() {
  const listElem = document.getElementById('equation-list');
  const pair = Soe.generate();
  const { x, y } = Soe.solve(pair);
  listElem.innerText += `${pair[0].format()}\n${pair[1].format()}\n`;
  listElem.innerText += `x = ${x}\ny = ${y}\n\n`;
}

const container = document.getElementById('container');
const button = document.createElement('input');
button.type = 'button';
button.id = 'generate-button';
button.value = 'generate';
button.onclick = generate;
container.appendChild(button);

const list = document.createElement('pre');
list.id = 'equation-list';
container.appendChild(list);

generate();
