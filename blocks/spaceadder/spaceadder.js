import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('spaceadder-spaceAdder-spaceAdder');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
    });
    wrapper.append(item);
  });

  block.textContent = '';
  block.append(wrapper);
}
