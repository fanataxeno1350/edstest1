import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('footerList');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footerList-list__item');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('a')) {
        div.classList.add('cta-analytics', 'analytics_cta_click', 'footerList-list__item--link', 'd-inline-block');
      }
    });
    wrapper.append(li);
  });

  block.textContent = '';
  block.append(wrapper);
}
