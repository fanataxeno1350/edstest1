import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'footerList-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  const authoredItems = block.querySelectorAll('div[data-aue-model="footerListItem"]');
  authoredItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'footerList-list__item';

    const linkElement = itemNode.querySelector('a[data-aue-prop="link"]');
    const linkTextElement = itemNode.querySelector('[data-aue-prop="text"]');

    const a = document.createElement('a');
    a.className = 'cta-analytics analytics_cta_click footerList-list__item--link d-inline-block';
    a.setAttribute('data-link-region', 'Footer List');

    if (linkElement) {
      a.href = linkElement.href;
      moveInstrumentation(linkElement, a);
    }

    if (linkTextElement) {
      a.textContent = linkTextElement.textContent;
      moveInstrumentation(linkTextElement, a);
    } else if (linkElement) {
      // Fallback if text is not explicitly defined but link is
      a.textContent = linkElement.textContent;
    }

    li.append(a);
    moveInstrumentation(itemNode, li);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
  block.className = 'footerList block';
  block.dataset.blockStatus = 'loaded';
}
