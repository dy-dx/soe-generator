import Soe from './lib/soe';

function createElement(tagName = 'div', className = '') {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

class GeneratorDemo {
  constructor() {
    const containerElem = createElement('div', 'generator-demo');
    const buttonContainerElem = createElement('div', 'generator-demo-buttons');
    const listContainerElem = createElement('div', 'generator-demo-equations-container');
    const listElem = createElement('pre', 'generator-demo-equations');

    containerElem.appendChild(buttonContainerElem);
    buttonContainerElem.appendChild(this.createButton('elimination'));
    buttonContainerElem.appendChild(this.createButton('substitution'));
    buttonContainerElem.appendChild(this.createButton('random'));

    containerElem.appendChild(listContainerElem);
    listContainerElem.appendChild(listElem);

    this.containerElem = containerElem;
    this.listElem = listElem;
  }

  generate(type) {
    const pair = Soe.generateType(type);
    const { x, y } = Soe.solve(pair);
    this.listElem.innerText += `${pair[0].format()}\n${pair[1].format()}\n`;
    this.listElem.innerText += `x = ${x}\ny = ${y}\n\n`;
  }

  createButton(type) {
    const button = createElement('input');
    button.type = 'button';
    button.className = `generate-equation-button generate-equation-button-${type}`;
    button.value = type;
    button.onclick = () => {
      this.generate(type);
    };
    return button;
  }

  containerElem() {
    return this.containerElem;
  }
}

export default GeneratorDemo;
