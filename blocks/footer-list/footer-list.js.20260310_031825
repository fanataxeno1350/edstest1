import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'footerlist-footerList-footer-list footerlist-d-flex footerlist-align-items-center footerlist-justify-content-center footerlist-align-items-md-start footerlist-flex-column';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'footerlist-footerList-footer-list__item';

    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.className = 'footerlist-footerList-cta-analytics footerlist-footerList-analytics_cta_click footerlist-footerList-footer-list__item--link footerlist-d-inline-block';
      newLink.setAttribute('data-link-region', 'Footer List');
      moveInstrumentation(link, newLink);
      li.append(newLink);
    }
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
